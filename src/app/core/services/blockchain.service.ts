import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private backUrl = 'http://127.0.0.1:';

  constructor(private http: HttpClient) {
  }


  /**
  * 
   * @param port 
   */
  public checkServer(port: number): Observable<any> {
    return this.http.get(this.backUrl + `${port}/ping`);
  }


  /**
   * 
   * @param port 
   */
  public updateBlockChain(port: number): Promise<any> {
    return this.http.get(this.backUrl + `${port}/chain`).toPromise();
  }

  /**
   * 
   * @param port 
   */
  public updateFiles(port: number): Promise<any> {
    return this.http.get(this.backUrl + `${port}/files`).toPromise();
  }

  /**
   * 
   * @param port
   * @param idFile 
   */
  public checkFile(port: number, idFile: number): Promise<any> {
    return this.http.get(this.backUrl + `${port}/check?idfile=${idFile}`).toPromise();
  }

  /**
   * 
   * @param port
   * @param data 
   */
  public postNewFile(port: number, data: any): Observable<any> {
    return this.http.post(this.backUrl + `${port}/new_transaction`, data);
  }
}
