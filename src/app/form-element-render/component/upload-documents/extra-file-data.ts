import { FileItem } from 'ng2-file-upload';

export class ExtraFileData {
  /**
   * сквозной идентификатор файла на стороне клиента
   */
  public index: number|string = '';

  /**
   * Идентификаторо файла полученный со стороны сервера
   */
  public key: number|string = '';

  /**
   * Название документа
   * @type {string}
   */
  public title = '';

  public constructor(index: number|string = '', title?: string, key?: number|string) {
    this.index = index || '';
    if (title !== undefined) {
      this.title = title;
    }
    if (key !== undefined) {
      this.key = key;
    }
  }
}
