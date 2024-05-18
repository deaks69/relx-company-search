import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { selectNotification } from './store/notifications.selectors';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let toastrService: ToastrService;

  const initialState = {
    notification: {
      message: '',
      error: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ToastrService,
          useValue: {
            success: vi.fn(),
            error: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();

    vi.spyOn(toastrService, 'success');
    vi.spyOn(toastrService, 'error');
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display success notification', () => {
    const notification = { message: 'Success message', error: false };
    store.overrideSelector(selectNotification, notification);
    store.refreshState();
    fixture.detectChanges();

    expect(toastrService.success).toHaveBeenCalledWith('Success message');
    expect(toastrService.error).not.toHaveBeenCalled();
  });

  test('should display error notification', () => {
    const notification = { message: 'Error message', error: true };
    store.overrideSelector(selectNotification, notification);
    store.refreshState();
    fixture.detectChanges();

    expect(toastrService.error).toHaveBeenCalledWith('Error message');
    expect(toastrService.success).not.toHaveBeenCalled();
  });
});
