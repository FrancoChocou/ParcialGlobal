import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/${id}`);
  }

  createPhoto(photo: Omit<Photo, 'id'>): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, photo);
  }

  updatePhoto(id: number, photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.apiUrl}/${id}`, photo);
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}