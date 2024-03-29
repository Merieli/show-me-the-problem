import { IFeedbackFilters, IConfiguredFilters } from '@/interfaces';
import { feedbackFilterColors, feedbackFilterLabels } from '@/views/Feedbacks/module';

export const applyFiltersStructure = (summary: IFeedbackFilters, filterActive?: string): IConfiguredFilters[] => {
    return Object.keys(summary).map((typeOfFeedback) => {
        const checkActive = (): boolean => {
            if (!filterActive && typeOfFeedback === 'all') return true;

            if (filterActive && typeOfFeedback === filterActive) return true;

            return false;
        };

        const currentFilter: IConfiguredFilters = {
            label: feedbackFilterLabels[typeOfFeedback as keyof IFeedbackFilters],
            color: {
                text: `text-${feedbackFilterColors[typeOfFeedback as keyof IFeedbackFilters]}`,
                bg: `bg-${feedbackFilterColors[typeOfFeedback as keyof IFeedbackFilters]}`,
            },
            amount: summary[typeOfFeedback as keyof IFeedbackFilters],
            active: checkActive(),
            type: typeOfFeedback,
        };

        return currentFilter;
    });
};
