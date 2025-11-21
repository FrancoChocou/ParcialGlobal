import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-form.component.html',
  styleUrl: './photo-form.component.css'
})
export class PhotoFormComponent {
 
}