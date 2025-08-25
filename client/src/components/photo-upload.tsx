import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  type: "menu" | "gallery";
  restaurantId: string;
  categoryId?: string;
  className?: string;
}

export default function PhotoUpload({ type, restaurantId, categoryId, className, ...props }: PhotoUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const endpoint = type === "menu" 
        ? `/api/restaurants/${restaurantId}/menu`
        : `/api/restaurants/${restaurantId}/gallery`;
        
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Upload Successful",
        description: `${type === "menu" ? "Menu item" : "Photo"} has been uploaded successfully.`,
      });
      
      setIsOpen(false);
      setTitle("");
      setDescription("");
      
      if (type === "menu") {
        queryClient.invalidateQueries({
          queryKey: ["/api/restaurants", restaurantId, "menu"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["/api/restaurants", restaurantId, "gallery"],
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    
    if (type === "menu") {
      formData.append('name', file.name.split('.')[0]);
      formData.append('price', '€0');
      formData.append('category', categoryId || 'starters');
    } else {
      if (title) formData.append('title', title);
      if (description) formData.append('description', description);
    }
    
    uploadMutation.mutate(formData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (type === "menu") {
    return (
      <>
        <Button
          onClick={openFileDialog}
          disabled={uploadMutation.isPending}
          className={`w-full px-4 py-2 bg-olive text-white rounded-lg hover:bg-olive-light transition-colors disabled:opacity-50 ${className}`}
          {...props}
        >
          {uploadMutation.isPending ? (
            "Uploading..."
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Photos
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`bg-olive text-white px-6 py-3 rounded-lg hover:bg-olive-light transition-colors ${className}`}
          {...props}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Gallery Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title (optional)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Photo title"
              data-testid="input-photo-title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Photo description"
              data-testid="input-photo-description"
            />
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver ? "border-wine bg-wine/10" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-2">
              <Image className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">
                  Drag and drop an image here, or{" "}
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-wine hover:text-wine-dark underline"
                    data-testid="button-select-file"
                  >
                    click to select
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 5MB
                </p>
              </div>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          {uploadMutation.isPending && (
            <div className="text-center text-sm text-gray-600">
              Uploading...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
