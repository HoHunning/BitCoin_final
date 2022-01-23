import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultisigWalletComponent } from './create-multisig-wallet.component';

describe('CreateMultisigWalletComponent', () => {
  let component: CreateMultisigWalletComponent;
  let fixture: ComponentFixture<CreateMultisigWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMultisigWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMultisigWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
