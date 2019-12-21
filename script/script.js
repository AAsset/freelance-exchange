document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
          freelancer = document.getElementById('freelancer'),
          blockCustomer = document.querySelector('#block-customer'),
          blockFreelancer = document.querySelector('#block-freelancer'),
          blockChoice = document.querySelector('#block-choice'),
          btnExit = document.querySelector('#btn-exit'),
          formCustomer = document.querySelector('#form-customer'),
          ordersTable = document.querySelector('#orders'),
          modalOrder = document.querySelector('#order_read'),
          modalOrderActive = document.querySelector('#order_active');

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const toStorage = () => {
        localStorage.setItem('orders', JSON.stringify(orders));
    };

    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.id];

        const baseActions = () => {
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        };

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }

        if (target.classList.contains('get-order')) {
            order.active = true;
            baseActions();
        }

        if (target.id === 'capitulation') {
            order.active = false;
            baseActions();
        }

        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            baseActions();
        }
    };

    const openModal = (order) => {
        const { title, firstName, email, phone, description, amount,
                currency, deadline, active = false } = order;
        const modal = active ? modalOrderActive : modalOrder;
        modal.id = orders.indexOf(order);

        const titleBlock = modal.querySelector('.modal-title'),
              firstNameBlock = modal.querySelector('.firstName'),
              emailBlock = modal.querySelector('.email'),
              descriptionBlock = modal.querySelector('.description'),
              currencyBlock = modal.querySelector('.currency_img'),
              countBlock = modal.querySelector('.count'),
              phoneBlock = modal.querySelector('.phone'),
              deadlineBlock = modal.querySelector('.deadline');

        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.textContent = email;
        emailBlock.href = 'mailto:' + email;
        descriptionBlock.textContent = description;
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        deadlineBlock.textContent = deadline;
        if (phoneBlock) phoneBlock.href = 'tel:' + phone;

        modal.style.display = 'flex';

        modal.addEventListener('click', handlerModal);
    };

    const declareCount = (number, titles) => {
        const index = (number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5];
        return number + ' ' + titles[index];
    };

    const calcDeadline = (date) => {
        const deadlineDate = new Date(date);
        const currentDate = new Date();
        const remaining = (deadlineDate - currentDate) / (60 * 60 * 1000);
        const days = ['день', 'дня', 'дней'];
        const hours = ['час', 'часа', 'часов'];

        if (remaining / 24 > 2) {
            return declareCount(Math.floor(remaining / 24), days);
        }
        return declareCount(Math.floor(remaining), hours);
    };

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order ${ order.active ? 'taken' : '' }"
                    data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${calcDeadline(order.deadline)}</td>
                </tr>`;
        });
    };


    ordersTable.addEventListener('click', (e) => {
        const target = e.target;
        const targetOrder = target.closest('.order');
        const order = orders[targetOrder.dataset.numberOrder];

        if (targetOrder) {
            openModal(order);
        }

    });

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';

        const today = new Date().toISOString().substring(0, 10);
        document.querySelector('#deadline').min = today;

        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();

        const elements = [...formCustomer.elements].filter(el => {
            return (el.tagName === 'INPUT' && el.type !== 'radio') ||
                   (el.type === 'radio' && el.checked) ||
                   (el.tagName === 'TEXTAREA')
        });

        const obj = {};
        elements.forEach(el => obj[el.name] = el.value || '');
        orders.push(obj);

        formCustomer.reset();
        toStorage();
    });
})