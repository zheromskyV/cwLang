import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from './constants/router-paths';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: routerPaths.auth,
    loadChildren: () => import('./auth/auth.module').then(({ AuthModule }) => AuthModule),
  },
  {
    path: routerPaths.myProfile,
    loadChildren: () => import('./profile/profile.module').then(({ ProfileModule }) => ProfileModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.courses,
    loadChildren: () => import('./courses/courses.module').then(({ CoursesModule }) => CoursesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.students,
    loadChildren: () => import('./students/students.module').then(({ StudentsModule }) => StudentsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.teachers,
    loadChildren: () => import('./teachers/teachers.module').then(({ TeachersModule }) => TeachersModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.groups,
    loadChildren: () => import('./groups/groups.module').then(({ GroupsModule }) => GroupsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.learning,
    loadChildren: () => import('./words/words.module').then(({ WordsModule }) => WordsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: routerPaths.notFound,
    loadChildren: () => import('./not-found/not-found.module').then(({ NotFoundModule }) => NotFoundModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: routerPaths.notFound,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
