let bubbles = [];
const numBubbles = 10;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
  noStroke();

  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
  background('#2F0744'); // Dark Purple
  
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bubbles = [];
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push(new Bubble());
  }
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(50, 200);
    this.velY = random(0.2, 0.8);
    this.color1 = color('#FF7B00'); // Bright Orange
    this.color2 = color('#FF0077'); // Hot Pink
    this.color3 = color('#FF00D5'); // A third, contrasting color
  }

  update() {
    this.y += this.velY;
    if (this.y > height + this.radius) {
      this.y = -this.radius;
      this.x = random(width);
    }
  }

  display() {
    // A gradient effect for a lava lamp look
    let c = lerpColor(this.color1, this.color2, abs(sin(this.y * 0.005)));
    let c2 = lerpColor(this.color2, this.color3, abs(cos(this.y * 0.005)));
    
    let numCircles = 5;
    for (let i = 0; i < numCircles; i++) {
      let r = this.radius * (1 - i / numCircles);
      let alpha = map(i, 0, numCircles - 1, 100, 0);
      let mixedColor = lerpColor(c, c2, i/numCircles);
      mixedColor.setAlpha(alpha);
      fill(mixedColor);
      ellipse(this.x, this.y, r * 2, r * 2);
    }
  }
}

function showPage(pageId) {
  let pages = document.querySelectorAll('.page-content');
  pages.forEach(page => {
    page.classList.remove('active-page');
  });
  
  let targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active-page');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('what-is-the-project-button').addEventListener('click', () => {
    showPage('what-is-the-project-page');
  });

  document.getElementById('why-the-project-button').addEventListener('click', () => {
    showPage('why-the-project-page');
  });

  document.getElementById('meet-the-women-button').addEventListener('click', () => {
    showPage('meet-the-women-page');
  });

  document.getElementById('start-conversation-button').addEventListener('click', () => {
    showPage('start-the-conversation-page');
  });

  document.getElementById('submit-story-button').addEventListener('click', () => {
    showPage('submit-a-story-page');
  });

  document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('data-target');
      showPage(targetId);
    });
  });

  // New accordion functionality
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-accordion-id');
      const targetContent = document.getElementById(targetId);
      
      // Close all other open accordion sections
      document.querySelectorAll('.accordion-content.open').forEach(content => {
        if (content.id !== targetId) {
          content.classList.remove('open');
        }
      });

      // Toggle the current one
      targetContent.classList.toggle('open');
    });
  });
});