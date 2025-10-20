'use client'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArtworkCategory, ArtworkType } from '@/types/artwork';

interface ArtworkUploadProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  description: string;
  images: File[];
  category: ArtworkCategory;
  type: ArtworkType;
  tags: string[];
  price?: number;
  width?: number;
  height?: number;
  depth?: number;
  unit: 'cm' | 'in';
  location: string;
}

export function ArtworkUpload({ onSubmit }: ArtworkUploadProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    images: [],
    category: 'painting',
    type: 'physical',
    tags: [],
    unit: 'cm',
    location: '',
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to 5 images
    const newImages = [...formData.images, ...acceptedFiles].slice(0, 5);
    setFormData({ ...formData, images: newImages });
    
    // Create preview URLs
    const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5242880, // 5MB
    multiple: true,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
  });

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
    
    // Update preview URLs
    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : Number(value);
    setFormData({ ...formData, [name]: numberValue });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim().toLowerCase())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim().toLowerCase()],
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    onSubmit(formData);
  };

  const categories: ArtworkCategory[] = [
    'painting',
    'drawing',
    'sculpture',
    'photography',
    'digital',
    'mixed-media',
    'illustration',
    'traditional-chinese',
    'calligraphy',
    'other',
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <h1 className="text-2xl font-bold mb-6">Upload Your Artwork</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Artwork Images <span className="text-red-500">*</span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
            } ${errors.images ? 'border-red-500' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDragActive
                  ? 'Drop your images here...'
                  : 'Drag & drop images here, or click to select files'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Max 5 images, 5MB each (JPEG, PNG, GIF, WEBP)
              </p>
            </div>
          </div>
          {errors.images && (
            <p className="text-sm text-red-500">{errors.images}</p>
          )}

          {/* Image Previews */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Uploaded Images:</p>
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {previewUrls.length < 5 && (
                  <div
                    {...getRootProps()}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500"
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            error={errors.title}
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`mt-1 block w-full rounded-md border ${
              errors.description
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Category and Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="physical">Physical</option>
              <option value="digital">Digital</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">Tags</label>
          <div className="flex mt-1">
            <Input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tags (e.g., landscape, modern)"
              className="grow"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button
              type="button"
              onClick={addTag}
              variant="outline"
              className="ml-2"
            >
              Add
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price (HKD)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            value={formData.price || ''}
            onChange={handleNumberInput}
            placeholder="Leave empty if not for sale"
            className="mt-1"
          />
        </div>

        {/* Dimensions (only for physical artworks) */}
        {formData.type === 'physical' && (
          <div>
            <label className="block text-sm font-medium mb-1">Dimensions</label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Input
                  name="width"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.width || ''}
                  onChange={handleNumberInput}
                  placeholder="Width"
                />
              </div>
              <div>
                <Input
                  name="height"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.height || ''}
                  onChange={handleNumberInput}
                  placeholder="Height"
                />
              </div>
              <div>
                <Input
                  name="depth"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.depth || ''}
                  onChange={handleNumberInput}
                  placeholder="Depth"
                />
              </div>
              <div>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-10"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            error={errors.location}
            placeholder="e.g., Central, Hong Kong"
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Upload Artwork
          </Button>
        </div>
      </form>
    </div>
  );
}
