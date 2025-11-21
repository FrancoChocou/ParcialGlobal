import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-modal.component.html',
  styleUrl: './photo-modal.component.css'
})
export class PhotoModalComponent {
  @Input() photo: Photo | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Photo>();

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.photo) {
      this.save.emit(this.photo);
    }
  }
}