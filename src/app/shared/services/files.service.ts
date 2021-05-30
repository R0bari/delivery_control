import {Injectable} from '@angular/core';
import {AttachedFile} from '../../messages/models/AttachedFile';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NotificationService} from './notification.service';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  url = environment.defaultUrl + 'files/';
  files: AttachedFile[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  async getFiles(): Promise<any> {
    const currentUserId = this.authService.currentUser.userId;
    const response = await this.http.get<any>(this.url + `list${currentUserId}`).toPromise();
    if (!response.isSuccess) {
      this.notificationService.showError('Список файлов', 'Ошибка при получении списка файлов');
      return;
    }
    return response.data;
  }

  addFiles(files: File[]): void {
    files.forEach(file => this.addFile(file));
  }

  addFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const attachedFile = new AttachedFile();
    reader.onload = () => {
      attachedFile.title = file.name;
      attachedFile.fileType = this.parseFileData(reader.result as string);
      attachedFile.base64Content = this.parseFileContent(reader.result as string);
      this.files.push(attachedFile);
    };
  }

  public async uploadAttachedFiles(): Promise<void> {
    const response = await this.http.post<any>(this.url, this.files).toPromise();
    console.log('files upload status: ' + response.isSuccess);
  }

  public clearFiles(): void {
    this.files = [];
  }

  private parseFileData(result: string): string {
    return result.substring('data:'.length, result.indexOf(';'));
  }

  private parseFileContent(result: string): string {
    return result.substring(result.indexOf(',') + 1);
  }

  public downloadFile(file: AttachedFile): void {
    const sampleArr = this.base64ToArrayBuffer(file.base64Content);
    this.saveByteArray(file.title, sampleArr, file.fileType);
  }

  private base64ToArrayBuffer(base64: any): Uint8Array {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private saveByteArray(reportName: string, byte: Uint8Array, fileType: string): void {
    const blob = new Blob([byte], {type: fileType});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
  }

  public deleteSelectedFile(id: number): void {
    const index = this.files.findIndex(f => f.id === id);
    this.files.splice(index, 1);
  }
}
