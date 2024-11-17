// menu-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SplitPaneComponent } from './split-pane.component';

interface MenuItem {
  name: string;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MenuCourse {
  name: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    SplitPaneComponent
  ],
  template: `
    <app-split-pane>
      <div leftPane class="form-container">
        <form [formGroup]="menuForm">
          <mat-card *ngFor="let course of courses; let courseIndex = index">
            <mat-card-header>
              <mat-card-title>{{ course.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div [formGroupName]="course.name.toLowerCase()">
                <mat-form-field *ngFor="let item of course.items">
                  <mat-label>{{ item.name }}</mat-label>
                  <mat-select [formControlName]="item.name.toLowerCase().replace(' ', '_')">
                    <mat-option [value]="null">Skip</mat-option>
                    <mat-option [value]="item">Select</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </mat-card-content>
          </mat-card>
        </form>
      </div>

      <div rightPane class="summary-container">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Your Dining Experience</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let course of courses" class="course-summary">
              <h3>{{ course.name }}</h3>
              <p>{{ getMadlibSummary(course.name) }}</p>

              <div class="nutrition-summary">
                <h4>Course Nutrition</h4>
                <div class="nutrition-grid">
                  <div>Protein: {{ getCourseNutrition(course.name).protein }}g</div>
                  <div>Carbs: {{ getCourseNutrition(course.name).carbs }}g</div>
                  <div>Fat: {{ getCourseNutrition(course.name).fat }}g</div>
                </div>

                <div *ngFor="let item of getSelectedItems(course.name)" class="dish-nutrition">
                  <h5>{{ item.name }}</h5>
                  <div class="nutrition-grid">
                    <div>Protein: {{ item.nutrition.protein }}g</div>
                    <div>Carbs: {{ item.nutrition.carbs }}g</div>
                    <div>Fat: {{ item.nutrition.fat }}g</div>
                  </div>
                </div>
              </div>
              <mat-divider></mat-divider>
            </div>

            <div class="total-nutrition">
              <h3>Total Meal Nutrition</h3>
              <div class="nutrition-grid">
                <div>Total Protein: {{ getTotalNutrition().protein }}g</div>
                <div>Total Carbs: {{ getTotalNutrition().carbs }}g</div>
                <div>Total Fat: {{ getTotalNutrition().fat }}g</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </app-split-pane>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .form-container {
      padding: 1rem;

      mat-card {
        margin-bottom: 1rem;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }

    .summary-container {
      padding: 1rem;
    }

    .course-summary {
      margin-bottom: 2rem;

      h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }

      p {
        line-height: 1.6;
        color: #34495e;
      }
    }

    .nutrition-summary {
      margin: 1rem 0;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 4px;

      h4 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
      }
    }

    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 0.5rem 0;
    }

    .dish-nutrition {
      margin: 1rem 0;
      padding-left: 1rem;
      border-left: 3px solid #e0e0e0;

      h5 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
      }
    }

    .total-nutrition {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #e9ecef;
      border-radius: 4px;

      h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }
    }
  `]
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  courses: MenuCourse[] = [
    {
      name: 'Appetizers',
      items: [
        {
          name: 'Bruschetta',
          nutrition: { protein: 3, carbs: 15, fat: 5 }
        },
        {
          name: 'Calamari',
          nutrition: { protein: 12, carbs: 18, fat: 8 }
        },
        {
          name: 'Caprese Salad',
          nutrition: { protein: 8, carbs: 6, fat: 12 }
        }
      ]
    },
    {
      name: 'Entrees',
      items: [
        {
          name: 'Grilled Salmon',
          nutrition: { protein: 25, carbs: 0, fat: 15 }
        },
        {
          name: 'Beef Tenderloin',
          nutrition: { protein: 30, carbs: 0, fat: 20 }
        },
        {
          name: 'Mushroom Risotto',
          nutrition: { protein: 8, carbs: 45, fat: 10 }
        }
      ]
    },
    {
      name: 'Desserts',
      items: [
        {
          name: 'Tiramisu',
          nutrition: { protein: 5, carbs: 35, fat: 15 }
        },
        {
          name: 'Chocolate Lava Cake',
          nutrition: { protein: 6, carbs: 40, fat: 18 }
        },
        {
          name: 'Crème Brûlée',
          nutrition: { protein: 4, carbs: 30, fat: 20 }
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({});
    this.initForm();
  }

  ngOnInit() {
    this.menuForm.valueChanges.subscribe(() => {
      // You could add additional logic here if needed
    });
  }

  private initForm() {
    this.courses.forEach(course => {
      const courseGroup = this.fb.group({});
      course.items.forEach(item => {
        courseGroup.addControl(
          item.name.toLowerCase().replace(' ', '_'),
          this.fb.control(null)
        );
      });
      this.menuForm.addControl(course.name.toLowerCase(), courseGroup);
    });
  }

  getMadlibSummary(courseName: string): string {
    const selectedItems = this.getSelectedItems(courseName);
    if (selectedItems.length === 0) return `No ${courseName.toLowerCase()} selected yet.`;

    const itemNames = selectedItems.map(item => item.name);

    switch(courseName) {
      case 'Appetizers':
        return `To start your culinary journey, you've chosen ${this.formatList(itemNames)}.
                These delightful ${courseName.toLowerCase()} will awaken your palate.`;
      case 'Entrees':
        return `For your main course, you'll be enjoying ${this.formatList(itemNames)}.
                This selection promises to be the highlight of your dining experience.`;
      case 'Desserts':
        return `To complete your meal, you've selected ${this.formatList(itemNames)} for dessert.
                A perfect way to end your dining experience on a sweet note.`;
      default:
        return '';
    }
  }

  private formatList(items: string[]): string {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }

  getSelectedItems(courseName: string): MenuItem[] {
    const courseGroup = this.menuForm.get(courseName.toLowerCase());
    if (!courseGroup) return [];

    return Object.values(courseGroup.value)
      .filter(Boolean) as MenuItem[];
  }

  getCourseNutrition(courseName: string) {
    const selectedItems = this.getSelectedItems(courseName);
    return {
      protein: selectedItems.reduce((sum, item) => sum + item.nutrition.protein, 0),
      carbs: selectedItems.reduce((sum, item) => sum + item.nutrition.carbs, 0),
      fat: selectedItems.reduce((sum, item) => sum + item.nutrition.fat, 0)
    };
  }

  getTotalNutrition() {
    return this.courses.reduce((total, course) => {
      const courseNutrition = this.getCourseNutrition(course.name);
      return {
        protein: total.protein + courseNutrition.protein,
        carbs: total.carbs + courseNutrition.carbs,
        fat: total.fat + courseNutrition.fat
      };
    }, { protein: 0, carbs: 0, fat: 0 });
  }
}
