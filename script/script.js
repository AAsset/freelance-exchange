document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
          freelancer = document.getElementById('freelancer'),
          blockCustomer = document.querySelector('#block-customer'),
          blockFreelancer = document.querySelector('#block-freelancer'),
          blockChoice = document.querySelector('#block-choice'),
          btnExit = document.querySelector('#btn-exit'),
          formCustomer = document.querySelector('#form-customer'),
          ordersTable = document.querySelector('#orders');

    const orders = [];

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    };


    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
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
    });
})