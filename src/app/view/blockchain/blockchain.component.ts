import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from 'src/app/core/services';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {
  public portList: number[];
  public blockchain = [];
  public files = [];
  private file = null;
  public checkFile = null;
  public blockchainForm: FormGroup;
  public selectedPort: number;

  constructor(private blockchainService: BlockchainService, private http: HttpClient) {
    this.blockchainForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      fileName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectedPort = 8000;
    this.checkServers([], this.selectedPort);
  }

  private checkServers(portList, port: number) {
    this.blockchainService.checkServer(port).subscribe(data => {
      portList.push(port);
      port = port + 1;
      this.checkServers(portList, port);
    }, error => {
    }, () => {
      this.portList = portList;
      this.updateBlockChain();
      this.updateFiles();
    });
  }

  public updateFilesBlockChain(port: number) {
    this.selectedPort = port;
    this.updateBlockChain(port);
    this.updateFiles(port);
  }

  private updateBlockChain(port?: number) {
    const randomPort = !port ? this.portList[Math.floor(Math.random() * this.portList.length)] : port;
    this.blockchainService.updateBlockChain(randomPort).then((resp) => {
      this.blockchain = resp.chain;
    });
  }

  private updateFiles(port?: number) {
    const randomPort = !port ? this.portList[Math.floor(Math.random() * this.portList.length)] : port;
    this.blockchainService.updateFiles(randomPort).then((resp) => {
      this.files = [];
      resp.forEach(element => {
        this.files.push(JSON.parse(element));
      });
    });
  }

  public checkfile(idFile: number) {
    const randomPort = this.portList[Math.floor(Math.random() * this.portList.length)];
    this.blockchainService.checkFile(randomPort, idFile).then((resp) => {
      this.checkFile = resp?.file_is_safe;
    });
  }

  public onSubmit() {
    if (this.blockchainForm.valid) {
      const randomPort = this.portList[Math.floor(Math.random() * this.portList.length)];
      const formData = new FormData();
      formData.append("fileupload", this.file);
      formData.append("name", this.blockchainForm.getRawValue().nom);
      this.blockchainService.postNewFile(randomPort, formData).subscribe((response) => {
      }, error => {
        if (error.status === 201) {
          this.updateFilesBlockChain(this.selectedPort);
          this.blockchainForm.reset();
        }
      });
    }
  }

  public onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.blockchainForm.get('fileName').setValue(this.file.name);
    }
  }
}
