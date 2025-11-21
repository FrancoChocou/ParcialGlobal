import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PhotoModalComponent],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.css'
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  isModalOpen = false;
  newPhoto: Omit<Photo, 'id'> = { albumId: 1, title: '', url: '', thumbnailUrl: '' };

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos().subscribe({
      next: (data: Photo[]) => {
        this.photos = data.slice(0, 10);
      },
      error: (error: any) => {
        console.error('Error :', error);
      }
    });
  }

  openEditModal(photo: Photo) {
    this.selectedPhoto = { ...photo };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPhoto = null;
  }

  updatePhoto(updatedPhoto: Photo) {
    if (updatedPhoto) {
      this.photoService.updatePhoto(updatedPhoto.id, updatedPhoto).subscribe({
        next: () => {
          this.loadPhotos();
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error actualizando:', error);
        }
      });
    }
  }

  deletePhoto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
      this.photoService.deletePhoto(id).subscribe({
        next: () => {
          this.loadPhotos();
        },
        error: (error: any) => {
          console.error('Error borrando photo:', error);
        }
      });
    }
  }

  createPhoto() {
    this.photoService.createPhoto(this.newPhoto).subscribe({
      next: (photo: Photo) => {
        this.photos.unshift(photo);
        this.newPhoto = { albumId: 1, title: '', url: '', thumbnailUrl: '' };
      },
      error: (error: any) => {
        console.error('Error creating photo:', error);
      }
    });
  }
}