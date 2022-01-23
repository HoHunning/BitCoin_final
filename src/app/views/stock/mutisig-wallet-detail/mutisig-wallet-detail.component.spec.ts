import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutisigWalletDetailComponent } from './mutisig-wallet-detail.component';

describe('MutisigWalletDetailComponent', () => {
  let component: MutisigWalletDetailComponent;
  let fixture: ComponentFixture<MutisigWalletDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutisigWalletDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutisigWalletDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
