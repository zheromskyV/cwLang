import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/user';

export const makePayment = createAction('[PAYMENT] MAKE_PAYMENT', props<{ user: User; paymentAmount: number }>());

export const addDiscount = createAction('[PAYMENT] ADD_DISCOUNT', props<{ user: User; discount: number }>());
