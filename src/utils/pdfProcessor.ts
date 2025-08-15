import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ProcessedPDF {
  title: string;
  author: string;
  content: string[];
  totalPages: number;
  metadata: any;
}

export class PDFProcessor {
  static async extractTextFromPDF(file: File): Promise<ProcessedPDF> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const metadata = await pdf.getMetadata();
      const numPages = pdf.numPages;
      
      // Extract text from all pages
      const textContent: string[] = [];
      
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContentObj = await page.getTextContent();
        
        let pageText = '';
        textContentObj.items.forEach((item: any) => {
          if (item.str) {
            pageText += item.str + ' ';
          }
        });
        
        if (pageText.trim()) {
          textContent.push(pageText.trim());
        }
      }
      
      // Process the content into chapters
      const chapters = this.processIntoChapters(textContent);
      
      return {
        title: this.extractTitle(file.name, metadata.info),
        author: this.extractAuthor(metadata.info),
        content: chapters,
        totalPages: numPages,
        metadata: metadata.info
      };
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new Error('Failed to process PDF file. Please ensure it\'s a valid PDF.');
    }
  }

  private static extractTitle(filename: string, metadata: any): string {
    // Try to get title from metadata first
    if (metadata?.Title && metadata.Title.trim()) {
      return metadata.Title.trim();
    }
    
    // Fallback to filename without extension
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  }

  private static extractAuthor(metadata: any): string {
    if (metadata?.Author && metadata.Author.trim()) {
      return metadata.Author.trim();
    }
    
    if (metadata?.Creator && metadata.Creator.trim()) {
      return metadata.Creator.trim();
    }
    
    return 'Unknown Author';
  }

  private static processIntoChapters(textContent: string[]): string[] {
    const allText = textContent.join('\n\n');
    
    // Try to detect chapter breaks
    const chapterPatterns = [
      /(?:^|\n)\s*(?:Chapter|CHAPTER)\s+\d+/gi,
      /(?:^|\n)\s*(?:Part|PART)\s+\d+/gi,
      /(?:^|\n)\s*\d+\.\s+[A-Z][^.]*$/gm,
      /(?:^|\n)\s*[A-Z][A-Z\s]{10,}$/gm
    ];
    
    let chapters: string[] = [];
    let foundChapters = false;
    
    // Try each pattern to find chapter breaks
    for (const pattern of chapterPatterns) {
      const matches = Array.from(allText.matchAll(pattern));
      
      if (matches.length > 1) {
        foundChapters = true;
        let lastIndex = 0;
        
        matches.forEach((match, index) => {
          if (index > 0) {
            const chapterText = allText.slice(lastIndex, match.index).trim();
            if (chapterText.length > 100) { // Only add substantial chapters
              chapters.push(chapterText);
            }
          }
          lastIndex = match.index || 0;
        });
        
        // Add the last chapter
        const lastChapter = allText.slice(lastIndex).trim();
        if (lastChapter.length > 100) {
          chapters.push(lastChapter);
        }
        
        break;
      }
    }
    
    // If no chapters found, split by pages or create artificial chapters
    if (!foundChapters || chapters.length === 0) {
      if (textContent.length > 1) {
        // Use pages as chapters if we have multiple pages
        chapters = textContent.filter(page => page.length > 100);
      } else {
        // Split long text into chunks
        chapters = this.splitIntoChunks(allText, 3000);
      }
    }
    
    return chapters.length > 0 ? chapters : [allText];
  }

  private static splitIntoChunks(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/);
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence + '. ';
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }

  static generateCoverFromPDF(file: File): Promise<string> {
    return new Promise((resolve) => {
      // Generate a placeholder cover based on the filename
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(1, '#cc0000');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 400);
        
        // Add title text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        
        const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const words = title.split(' ');
        let line = '';
        let y = 200;
        
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > 250 && n > 0) {
            ctx.fillText(line, 150, y);
            line = words[n] + ' ';
            y += 30;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 150, y);
        
        resolve(canvas.toDataURL());
      } else {
        resolve('https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg');
      }
    });
  }
}