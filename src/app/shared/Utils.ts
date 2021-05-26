import {AttachedFile} from '../messages/models/AttachedFile';

export class Utils {

  public static formAttachedFile(file: File): Promise<AttachedFile> {
    return new Promise<AttachedFile>(_ => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const attachedFile = new AttachedFile();
      reader.onload = () => {
        attachedFile.title = file.name;
        attachedFile.fileType = this.parseFileData(reader.result as string);
        attachedFile.base64Content = this.parseFileContent(reader.result as string);
        return attachedFile;
      };
    });
  }
  private static parseFileData(result: string): string {
    return result.substring('data:'.length, result.indexOf(';'));
  }

  private static parseFileContent(result: string): string {
    return result.substring(result.indexOf(',') + 1);
  }
}
