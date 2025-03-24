import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function PdfViewer({ pdfUrl, image_url, variant }: { pdfUrl: string; image_url: string; variant: 'image' | 'pdf' }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View PDF</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                {variant === 'image' ? <iframe src={pdfUrl} className="h-[80vh] w-full" /> : <img src={image_url} />}
            </DialogContent>
        </Dialog>
    );
}
