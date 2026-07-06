import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByDateComponent } from './report-by-date.component';

describe('ReportByDateComponent', () => {
  let component: ReportByDateComponent;
  let fixture: ComponentFixture<ReportByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportByDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
