// Initialize meal plan storage
let mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
};

// Add meal to the selected day
function addMeal() {
    const daySelect = document.getElementById('day');
    const mealInput = document.getElementById('meal');
    const day = daySelect.value;
    const meal = mealInput.value.trim();

    // Validation
    if (meal === '') {
        alert('Please enter a meal!');
        return;
    }

    // Add meal to the plan
    mealPlan[day].push(meal);
    
    // Save to localStorage
    saveMealPlan();
    
    // Clear input
    mealInput.value = '';
    mealInput.focus();
    
    // Update display
    displaySchedule();
}

// Delete a meal
function deleteMeal(day, index) {
    mealPlan[day].splice(index, 1);
    saveMealPlan();
    displaySchedule();
}

// Save meal plan to localStorage
function saveMealPlan() {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
}

// Display the complete meal schedule
function displaySchedule() {
    const scheduleDiv = document.getElementById('schedule');
    scheduleDiv.innerHTML = '';

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach(day => {
        const daySection = document.createElement('div');
        daySection.className = 'day-section';

        const dayTitle = document.createElement('div');
        dayTitle.className = 'day-title';
        dayTitle.textContent = day;
        daySection.appendChild(dayTitle);

        const mealList = document.createElement('ul');
        mealList.className = 'meal-list';

        if (mealPlan[day].length === 0) {
            const noMeals = document.createElement('li');
            noMeals.className = 'no-meals';
            noMeals.textContent = 'No meals planned';
            mealList.appendChild(noMeals);
        } else {
            mealPlan[day].forEach((meal, index) => {
                const mealItem = document.createElement('li');
                mealItem.className = 'meal-item';

                const mealText = document.createElement('span');
                mealText.className = 'meal-text';
                mealText.textContent = meal;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteMeal(day, index);

                mealItem.appendChild(mealText);
                mealItem.appendChild(deleteBtn);
                mealList.appendChild(mealItem);
            });
        }

        daySection.appendChild(mealList);
        scheduleDiv.appendChild(daySection);
    });
}

// Allow Enter key to add meal
document.addEventListener('DOMContentLoaded', () => {
    const mealInput = document.getElementById('meal');
    mealInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addMeal();
        }
    });

    // Initial display
    displaySchedule();
});