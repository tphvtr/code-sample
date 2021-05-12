import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { DogsService } from 'src/app/services/dogs.service';
import { ThemeService } from 'src/app/services/theme.service';
import { themeImgs } from 'src/app/configs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadModalComponent implements OnInit, OnDestroy {
  file: File;
  isLoading: boolean;
  isError: boolean;
  message: string;
  images = themeImgs;
  theme$: Observable<string>;
  private _subscriptions = new Subscription();
  constructor(@Inject(DOCUMENT) public document: HTMLDocument,
              public dialog: MatDialogRef<UploadModalComponent>,
              private _sanitizer: DomSanitizer,
              private _dogService: DogsService,
              private _themeService: ThemeService,
              private _window: Window) {
                this.theme$ = this._themeService.theme$.asObservable();
              }

  ngOnInit() {
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.file = e.dataTransfer.files[0];
    this._fileReader();
    this.message = null;
  }

  onDragOver(e: DragEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  uploadPhoto(): void {
    this.isLoading = true;
    const file = new FormData();
    file.append('file', this.file);
    this._subscriptions.add(
      this._dogService.uploadImage(file)
        .subscribe(res => {
          this.isLoading = false;
          this.isError = false;
          this.file = null;
          this._showMessage();
        }, err => {
          if (err.error && err.error.level === 'info') {
            this.isLoading = false;
            this.isError = true;
            this._showMessage();
          }
        })
    );
  }

  onFileUpload(e): void {
    this.file = e.target.files[0];
    this._fileReader();
  }

  onPreviewLoaded(): void {
    this._window.URL.revokeObjectURL(this.file['url'] as string);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private _showMessage(): void {
    const el = this.document.getElementById('upload-toastr');
    el.style.opacity = '1';
    el.style.display = 'flex';
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.style.display = 'none', 500);
    }, 5000);
  }

  private _fileReader(): void {
    this.file['url'] = this._sanitizer.bypassSecurityTrustUrl(this._window.URL.createObjectURL(this.file));
    this.isError = false;
  }
}
