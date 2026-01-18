import type { ComponentDoc, CategoryId } from '../types';

// Form Inputs
import { buttonDoc } from './button';
import { inputDoc } from './input';
import { inputGroupDoc } from './input-group';
import { textareaDoc } from './textarea';
import { checkboxDoc } from './checkbox';
import { switchDoc } from './switch';
import { radioGroupDoc } from './radio-group';
import { selectDoc } from './select';
import { comboboxDoc } from './combobox';
import { sliderDoc } from './slider';
import { calendarDoc } from './calendar';
import { datePickerDoc } from './date-picker';
import { inputOTPDoc } from './input-otp';
import { toggleDoc } from './toggle';
import { labelDoc } from './label';
import { fieldDoc } from './field';
import { formDoc } from './form';

// Layout
import { cardDoc } from './card';
import { separatorDoc } from './separator';
import { aspectRatioDoc } from './aspect-ratio';
import { scrollAreaDoc } from './scroll-area';
import { buttonGroupDoc } from './button-group';
import { accordionDoc } from './accordion';
import { collapsibleDoc } from './collapsible';
import { tabsDoc } from './tabs';

// Data Display
import { typographyDoc } from './typography';
import { badgeDoc } from './badge';
import { avatarDoc } from './avatar';
import { skeletonDoc } from './skeleton';
import { tableDoc } from './table';
import { emptyDoc } from './empty';
import { carouselDoc } from './carousel';
import { chartDoc } from './chart';
import { progressDoc } from './progress';

// Feedback
import { alertDoc } from './alert';
import { dialogDoc } from './dialog';
import { alertDialogDoc } from './alert-dialog';
import { sheetDoc } from './sheet';
import { toastDoc } from './toast';
import { tooltipDoc } from './tooltip';
import { popoverDoc } from './popover';
import { spinnerDoc } from './spinner';
import { chatDoc } from './chat';

// Navigation
import { breadcrumbDoc } from './breadcrumb';
import { paginationDoc } from './pagination';
import { navigationMenuDoc } from './navigation-menu';
import { commandDoc } from './command';

export const componentDocs: ComponentDoc[] = [
  // Form Inputs
  buttonDoc,
  inputDoc,
  inputGroupDoc,
  textareaDoc,
  checkboxDoc,
  switchDoc,
  radioGroupDoc,
  selectDoc,
  comboboxDoc,
  sliderDoc,
  calendarDoc,
  datePickerDoc,
  inputOTPDoc,
  toggleDoc,
  labelDoc,
  fieldDoc,
  formDoc,
  // Layout
  cardDoc,
  separatorDoc,
  aspectRatioDoc,
  scrollAreaDoc,
  buttonGroupDoc,
  accordionDoc,
  collapsibleDoc,
  tabsDoc,
  // Data Display
  typographyDoc,
  badgeDoc,
  avatarDoc,
  skeletonDoc,
  tableDoc,
  emptyDoc,
  carouselDoc,
  chartDoc,
  progressDoc,
  // Feedback
  alertDoc,
  dialogDoc,
  alertDialogDoc,
  sheetDoc,
  toastDoc,
  tooltipDoc,
  popoverDoc,
  spinnerDoc,
  chatDoc,
  // Navigation
  breadcrumbDoc,
  paginationDoc,
  navigationMenuDoc,
  commandDoc,
];

export function getComponentById(id: string): ComponentDoc | undefined {
  return componentDocs.find((comp) => comp.id === id);
}

export function getComponentsByCategory(categoryId: CategoryId): ComponentDoc[] {
  return componentDocs.filter((comp) => comp.category === categoryId);
}
