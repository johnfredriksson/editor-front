import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have three links with correct URL's", () => {
    const course = fixture.debugElement.query(By.css("#course"));
    const school = fixture.debugElement.query(By.css("#school"));
    const github = fixture.debugElement.query(By.css("#github"));

    expect(course.attributes["href"]).toBe("https://www.jsramverk.se");
    expect(school.attributes["href"]).toBe("https://www.bth.se");
    expect(github.attributes["href"]).toBe("https://www.github.com/johnfredriksson");
  })
});
