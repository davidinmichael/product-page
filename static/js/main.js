window.addEventListener("DOMContentLoaded", () => {
  const featuredImage = document.getElementById("featured-image");
  const thumbnails = document.querySelectorAll(".gallery-thumb");
  const BUSINESS_WHATSAPP = "2348140980792";

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      featuredImage.src = thumb.src;

      thumbnails.forEach((item) => item.classList.remove("active"));

      thumb.classList.add("active");
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // ==========================
  // Product Packages
  // ==========================

  const packages = [
    {
      id: 1,
      title: "10 Pieces",
      quantity: 10,
      price: 12000,
      featured: false,
      benefits: [
        "10 Premium Wall Hooks",
        "Strong Adhesive",
        "Easy Installation",
      ],
    },
    {
      id: 2,
      title: "20 Pieces",
      quantity: 20,
      price: 20000,
      featured: true,
      benefits: [
        "20 Premium Wall Hooks",
        "Better Value",
        "Ideal for Homes & Offices",
      ],
    },
    {
      id: 3,
      title: "40 Pieces",
      quantity: 40,
      price: 30000,
      featured: false,
      benefits: [
        "40 Premium Wall Hooks",
        "Best Bulk Value",
        "Perfect for Families & Businesses",
      ],
    },
  ];

  // ==========================
  // Nigerian States
  // ==========================

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory (FCT)",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const stateSelect = document.getElementById("state");

  if (stateSelect) {
    stateSelect.innerHTML = '<option value="">Select your state</option>';

    nigerianStates.forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;

      stateSelect.appendChild(option);
    });
  }
  // ==========================
  // Populate Package Dropdown
  // ==========================

  const packageSelect = document.getElementById("package");

  if (packageSelect) {
    packageSelect.innerHTML = '<option value="">Select a package</option>';

    packages.forEach((pkg) => {
      const option = document.createElement("option");

      option.value = pkg.id;
      option.textContent = `${pkg.title} - ₦${pkg.price.toLocaleString()}`;

      packageSelect.appendChild(option);
    });
  }

  // ==========================
  // Populate Pricing Cards
  // ==========================

  const pricingGrid = document.getElementById("pricing-grid");

  if (pricingGrid) {
    pricingGrid.innerHTML = "";

    packages.forEach((pkg) => {
      const card = document.createElement("div");

      card.className = pkg.featured ? "pricing-card featured" : "pricing-card";

      card.innerHTML = `
      ${pkg.featured ? `<div class="pricing-badge">Most Popular</div>` : ""}

      <h3>${pkg.title}</h3>

      <div class="price">
        ₦${pkg.price.toLocaleString()}
      </div>

      <ul>
        ${pkg.benefits
          .map(
            (benefit) => `
            <li>
              <i class="fa-solid fa-check"></i>
              ${benefit}
            </li>
          `,
          )
          .join("")}
      </ul>

      <a
        href="#order-form"
        class="btn ${
          pkg.featured ? "btn-primary" : "btn-outline"
        } order-package"
        data-package="${pkg.id}"
      >
        Order Now
      </a>
    `;

      pricingGrid.appendChild(card);
    });
  }

  // ==========================
  // Pricing Card Selection
  // ==========================

  document.addEventListener("click", (e) => {
    const button = e.target.closest(".order-package");

    if (!button) return;

    const packageId = button.dataset.package;

    packageSelect.value = packageId;
  });

  // ==========================
  // Order Form Submission
  // ==========================

  const orderForm = document.getElementById("product-order-form");

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      const selectedPackageId = Number(
        document.getElementById("package").value,
      );

      const selectedPackage = packages.find(
        (pkg) => pkg.id === selectedPackageId,
      );

      if (!selectedPackage) {
        alert("Please select a package.");
        return;
      }

      const order = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        country: document.getElementById("country").value,
        state: document.getElementById("state").value,
        address: document.getElementById("address").value.trim(),
        package: selectedPackage,
      };

      const message = `Hello,

I would like to place an order for the Wall Hook.

Name: ${order.name}
Email: ${order.email}
Phone: ${order.phone}

Country: ${order.country}
State: ${order.state}

Delivery Address:
${order.address}

Package:
${order.package.title}

Price:
₦${order.package.price.toLocaleString()}

Thank you.`;

      const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
        message,
      )}`;

      window.open(whatsappUrl, "_blank");
    });
  }
});
