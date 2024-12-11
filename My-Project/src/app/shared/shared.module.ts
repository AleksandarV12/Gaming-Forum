import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [TruncatePipe], // Add the pipe here
  imports: [CommonModule],
  exports: [TruncatePipe], // Export so other modules can use it
})
export class SharedModule {}
