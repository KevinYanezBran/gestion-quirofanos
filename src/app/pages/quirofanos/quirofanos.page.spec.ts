import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuirofanosPage } from './quirofanos.page';

describe('QuirofanosPage', () => {
  let component: QuirofanosPage;
  let fixture: ComponentFixture<QuirofanosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuirofanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
