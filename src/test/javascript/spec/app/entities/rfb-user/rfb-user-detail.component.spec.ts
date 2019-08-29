/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbUserDetailComponent } from 'app/entities/rfb-user/rfb-user-detail.component';
import { RfbUser } from 'app/shared/model/rfb-user.model';

describe('Component Tests', () => {
  describe('RfbUser Management Detail Component', () => {
    let comp: RfbUserDetailComponent;
    let fixture: ComponentFixture<RfbUserDetailComponent>;
    const route = ({ data: of({ rfbUser: new RfbUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfbUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfbUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
