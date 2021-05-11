import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { LANGUAGE_OPTIONS } from 'src/app/constants/languages';
import { Languages } from 'src/app/constants/languages.enum';
import { Language } from 'src/app/models/language';
import * as AnalyticsActions from '../../../store/analytics/analytics.actions';
import * as fromAnalytics from '../../../store/analytics/analytics.selectors';

@Component({
  selector: 'cwl-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss'],
})
export class AdminAnalyticsComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  languages: Languages[] = LANGUAGE_OPTIONS.map(({ value }) => value).sort();

  radarOptions = {
    first: {
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
    },
    second: {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
    },
  };
  pieColors = ['#FFEC21', '#378AFF', '#FFA32F', '#F54F52', '#93F03B', '#9552EA', '#FF6384', '#36A2EB', '#FFCE56'];
  pieOptions = {
    backgroundColor: this.pieColors,
    hoverBackgroundColor: this.pieColors,
  };
  barOptions = {
    backgroundColor: '#42A5F5',
  };

  coursesInitialData$: Observable<any>;
  coursesTargetData$: Observable<any>;
  langData$: Observable<any>;
  marksData$: Observable<any>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(AnalyticsActions.getCoursesAnalytics());
    this.store.dispatch(AnalyticsActions.getLanguagesAnalytics());
    this.store.dispatch(AnalyticsActions.getGeneralMarksAnalytics());

    this.coursesInitialData$ = this.store.select(fromAnalytics.getCoursesAnalytics).pipe(
      map(({ initialLang }) => ({
        labels: this.languages.map((lang) => this.dictionary[lang]),
        datasets: [
          {
            data: this.mapLang(initialLang),
            ...this.pieOptions,
          },
        ],
      }))
    );

    this.coursesTargetData$ = this.store.select(fromAnalytics.getCoursesAnalytics).pipe(
      map(({ targetLang }) => ({
        labels: this.languages.map((lang) => this.dictionary[lang]),
        datasets: [
          {
            data: this.mapLang(targetLang),
            ...this.pieOptions,
          },
        ],
      }))
    );

    this.langData$ = this.store.select(fromAnalytics.getLanguagesAnalytics).pipe(
      map(({ student, teacher }) => ({
        labels: this.languages.map((lang) => this.dictionary[lang]),
        datasets: [
          {
            label: this.dictionary.studentsLangsAnalytics,
            data: this.mapLang(student),
            ...this.radarOptions.first,
          },
          {
            label: this.dictionary.teachersLangsAnalytics,
            data: this.mapLang(teacher),
            ...this.radarOptions.second,
          },
        ],
      }))
    );

    this.marksData$ = this.store.select(fromAnalytics.getGeneralMarksAnalytics).pipe(
      map((marks) => ({
        labels: Array.from({ length: marks.length }, (_, i) => i + 1),
        datasets: [
          {
            label: this.dictionary.generalMarks,
            data: [...marks],
            ...this.barOptions,
          },
        ],
      }))
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AnalyticsActions.clearAnalytics());
  }

  private mapLang(langs: Language[]): number[] {
    return this.languages.map((lang) => langs.find(({ name }) => name === lang)?.value || 0);
  }
}
