import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AlphabetCategoryPage } from './alphabet-category.page';
import { environment as env } from 'src/environments/environment';
import character_sets from '../../shared/character_data/character_sets.json';

describe('AlphabetCategoryPage', () => {
  let component: AlphabetCategoryPage;
  let fixture: ComponentFixture<AlphabetCategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetCategoryPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AlphabetCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test ifNormalNavbar ', () => {
    localStorage.setItem('id', ' admin');
    env.admin = true;
    env.superAdmin = false;
    fixture.detectChanges();
    const call = component.ifNormalNavbar();
    expect(call).toBeFalse();
  });
  it('test getJSON ', () => {

    component.currentJSON = 'katakana';
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.katakana);

    component.currentJSON = 'kanji';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.kanji);

    component.currentJSON = 'hiraganaVowels';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaVowels);

    component.currentJSON = 'hiraganaGroupK';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupK);

    component.currentJSON = 'hiraganaGroupS';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupS);

    component.currentJSON = 'hiraganaGroupT';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupT);

    component.currentJSON = 'hiraganaGroupN';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupN);

    component.currentJSON = 'hiraganaGroupH';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupH);

    component.currentJSON = 'hiraganaGroupK';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupK);

    component.currentJSON = 'hiraganaGroupM';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupM);

    component.currentJSON = 'hiraganaGroupY';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupY);

    component.currentJSON = 'hiraganaGroupR';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupR);

    component.currentJSON = 'hiraganaGroupW';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupW);

    component.currentJSON = 'hiraganaGroupG';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupG);

    component.currentJSON = 'hiraganaGroupZ';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupZ);

    component.currentJSON = 'hiraganaGroupD';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupD);

    component.currentJSON = 'hiraganaGroupB';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupB);

    component.currentJSON = 'hiraganaGroupP';
    fixture.detectChanges();
    component.getJSON();
    expect(component.jsonAlphabet).toBe(character_sets.hiraganaGroupP);

  });
});
