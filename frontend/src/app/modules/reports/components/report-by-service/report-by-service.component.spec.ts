import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByServiceComponent } from './report-by-service.component';

describe('ReportByServiceComponent', () => {
  let component: ReportByServiceComponent;
  let fixture: ComponentFixture<ReportByServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportByServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
