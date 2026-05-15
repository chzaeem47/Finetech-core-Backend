const API_URL = 'http://localhost:3000/api';

// --- SWITCH LAYOUT LOGIC ---
function switchView(targetViewId) {
    document.querySelectorAll('.stage-card').forEach(card => card.classList.add('hidden'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    document.getElementById(targetViewId).classList.remove('hidden');
    event.target.classList.add('active');
}

function toggleAuth(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('toggle-login-btn');
    const registerBtn = document.getElementById('toggle-register-btn');

    if(type === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('space-active');
        registerBtn.classList.remove('space-active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginBtn.classList.remove('space-active');
        registerBtn.classList.add('space-active');
    }
}

// --- HELPER UTIL FOR API ENGINE ---
async function requestEngine(endpoint, options = {}) {
    options.credentials = 'include'; // Crucial for cookie transmission
    if (options.body && typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
        options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'System Pipeline execution failure.');
    }
    return data;
}

// --- ACTION METHODS BOUND TO CONTROLLERS ---

async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const data = await requestEngine('/auth/register', {
            method: 'POST',
            body: { name, email, password }
        });
        alert(`Success! ${data.message}`);
        document.getElementById('node-user').innerText = data.user.name;
        toggleAuth('login');
    } catch (err) {
        alert(`Registration Error: ${err.message}`);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const data = await requestEngine('/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        alert(`Login Authorized: Welcome ${data.user.name}`);
        document.getElementById('node-user').innerText = data.user.name;
        // Move to core panel
        document.querySelector("[onclick=\"switchView('accounts-view')\"]").click();
    } catch (err) {
        alert(`Login Blocked: ${err.message}`);
    }
}

async function handleCreateAccount() {
    try {
        const data = await requestEngine('/accounts', { method: 'POST' });
        alert(`Document Initialized! Account ID: ${data.account._id}`);
        // Autofill forms
        document.getElementById('balance-account-id').value = data.account._id;
        document.getElementById('tx-from').value = data.account._id;
    } catch (err) {
        alert(`Account Fail: ${err.message}`);
    }
}

async function handleGetBalance() {
    const accountId = document.getElementById('balance-account-id').value.trim();
    if(!accountId) return alert('Specify account context id parameter.');

    try {
        const data = await requestEngine(`/accounts/balance/${accountId}`, { method: 'GET' });
        document.getElementById('balance-output').innerText = `${Number(data.balance).toLocaleString()} PKR`;
    } catch (err) {
        alert(`Balance Fetch Failure: ${err.message}`);
    }
}

async function handleTransfer(event) {
    event.preventDefault();
    const fromAccount = document.getElementById('tx-from').value.trim();
    const toAccount = document.getElementById('tx-to').value.trim();
    const amount = Number(document.getElementById('tx-amount').value);
    // Unique generation matching database index constraints
    const idempotencykey = `tx-key-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    try {
        const data = await requestEngine('/transactions', {
            method: 'POST',
            body: { fromAccount, toAccount, amount, idempotencykey }
        });
        alert(data.message);
        handleGetBalance(); // Auto refresh interface metrics
    } catch (err) {
        alert(`Transaction Aborted: ${err.message}`);
    }
}

async function handleSystemMint(event) {
    event.preventDefault();
    const toAccount = document.getElementById('mint-to').value.trim();
    const amount = Number(document.getElementById('mint-amount').value);
    const idempotencykey = `mint-key-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    try {
        const data = await requestEngine('/transactions/system/initial-funds', {
            method: 'POST',
            body: { toAccount, amount, idempotencykey }
        });
        alert(data.message);
        document.getElementById('balance-account-id').value = toAccount;
        handleGetBalance();
    } catch (err) {
        alert(`Mint Execution Error: ${err.message}`);
    }
}

async function handleLogout() {
    try {
        const data = await requestEngine('/auth/logout', { method: 'POST' });
        alert(data.message);
    } catch (e) {
        alert("Session drop processed.");
    } finally {
        document.getElementById('node-user').innerText = "Guest Terminal";
        document.getElementById('balance-output').innerText = "0.00 PKR";
        document.querySelector("[onclick=\"switchView('auth-view')\"]").click();
    }
}