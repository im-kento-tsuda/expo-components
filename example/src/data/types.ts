import React from 'react';

export type CategoryId = 'form-inputs' | 'layout' | 'data-display' | 'feedback' | 'navigation';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  render: () => React.ReactNode;
}

export interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  importStatement: string;
  props: PropDefinition[];
  examples: ComponentExample[];
  subComponents?: string[];
  notes?: string[];
}
