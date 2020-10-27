import * as Yup from "yup";

export const BookingPageSchema = Yup.object().shape({

    PassengerNumber: Yup.string()
        .min(10, 'Please type valid number')

        .required('Required'),
    SecondaryMobile: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),

    email: Yup.string().email('Invalid email').required('Required'),
    LargeBags: Yup.number(),
    SmallBags: Yup.number(),
    MediumBags: Yup.number()
});