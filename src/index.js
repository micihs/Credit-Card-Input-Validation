import connectToState from "./connectToState";
import CV from "./CardView";

import CCF from "./CreditCardInput";
import LiteCCF from "./LiteCreditCardInput";

export const CreditCardInput = connectToState(CCF);
export const LiteCreditCardInput = connectToState(LiteCCF);
export const CardView = CV;