function applyGradient(textElement, startColor, endColor) {
  const text = textElement.innerText;
  const length = text.length;

  textElement.innerText = '';
  for (let i = 0; i < length; i++) {
      const span = document.createElement('span');
      span.innerText = text[i];
      
      const ratio = i / (length - 1);
      const red = Math.round((1 - ratio) * 255);
      const green = Math.round((1 - ratio) * 0);
      const blue = Math.round((1 - ratio) * 0);
      
      span.style.color = `rgb(${red}, ${green}, ${blue})`;
      textElement.appendChild(span);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('gradient-text');
  applyGradient(textElement, 'red', 'black');
});

function toggleForm() {
  const title = document.getElementById("form-title");
  const form = document.getElementById("auth-form");
  const toggleText = document.getElementById("toggle-auth");

  if (title.innerText === "Login") {
      title.innerText = "Sign up" || "Create Account";
      form.innerHTML = `
          <div class="input-group">
              <label for="id-number">UGA Id#</label>
              <input type="text" name="id-number" id="id-number">
          </div>
          <div class="input-group">
              <label for="username">Username</label>
              <input type="text" name="username" id="username">
          </div>
          <div class="input-group">
              <label for="email">Email</label>
              <input type="email" name="email" id="email">
          </div>
          <div class="input-group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
          </div>
          <br>
          <button class="sign" type="button">Sign up</button>
      `;
      toggleText.innerHTML = `Already have an account? <a href="#" class="bold" onclick="toggleForm()">Sign in</a>`;
  } else {
      title.innerText = "Login";
      form.innerHTML = `
          <div class="input-group">
              <label for="username">Username</label>
              <input type="text" name="username" id="username">
          </div>
          <div class="input-group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
              <div class="forgot">
                  <a href="#">Forgot Password?</a>
              </div>
          </div>
          <button class="sign" type="button">Sign in</button>
      `;
      toggleText.innerHTML = `Don't have an account? <a href="#" class="bold" onclick="toggleForm()">Sign up</a>`;
  }
}
