import React from 'react';
import { UploadDialog } from '@/components/UploadDialog';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const UploadPage = () => {
  const [uploadOpen, setUploadOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <h1 className="text-3xl font-bold mb-6">Página de Upload</h1>
      <Button onClick={() => setUploadOpen(true)} className="gap-2">
        <Upload className="h-5 w-5" />
        Abrir Dialog de Upload
      </Button>
      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
};

export default UploadPage;