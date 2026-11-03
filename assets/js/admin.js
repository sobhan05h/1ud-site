/**
 * 1ud.ir - Complete /admin Visual CMS & Static File Exporter (Zero-Backend)
 */

(function () {
  let isUnlocked = sessionStorage.getItem("1UD_ADMIN_UNLOCKED") === "1";

  window.openAdminModal = function () {
    const modal = document.getElementById("admin-modal");
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    renderAdminShell();
  };

  window.closeAdminModal = function () {
    if (window.FORCE_OPEN_ADMIN) {
      window.location.href = "../index.html";
      return;
    }
    const modal = document.getElementById("admin-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
    if (window.location.hash.includes("admin")) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  function renderAdminShell() {
    const container = document.getElementById("admin-modal-body");
    if (!container) return;
    const data = getSiteData();
    const requiredPin = data.meta?.adminPin || "1234";

    if (!isUnlocked) {
      container.innerHTML = `
        <div style="max-width: 430px; margin: 70px auto; text-align: center; padding: 36px;" class="glass-panel">
          <div class="brand-cube" style="margin: 0 auto 18px; width: 58px; height: 58px; font-size: 1.3rem;">/admin</div>
          <h2 style="margin-bottom: 10px; color: #fff;">ورود به پنل مدیریت 1ud.ir</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
            رمز عبور پیش‌فرض <code style="color: var(--light-blue); font-weight:800;">1234</code> است (قابل تغییر در تنظیمات پنل).
          </p>
          <form id="admin-login-form">
            <div class="form-group">
              <input type="password" id="admin-pin-input" class="form-control" placeholder="رمز عبور ادمین را وارد کنید..." style="text-align:center; font-size:1.1rem; letter-spacing:3px;" autofocus />
            </div>
            <div style="display:flex; gap:10px; margin-top:18px;">
              <button type="submit" class="btn btn-primary" style="flex:1;">ورود به پنل</button>
              <button type="button" class="btn btn-outline" onclick="closeAdminModal()">بازگشت</button>
            </div>
          </form>
        </div>
      `;

      const form = document.getElementById("admin-login-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const entered = document.getElementById("admin-pin-input").value.trim();
        if (entered === requiredPin) {
          isUnlocked = true;
          sessionStorage.setItem("1UD_ADMIN_UNLOCKED", "1");
          renderAdminShell();
          showToast("خوش آمدید! پنل مدیریت /admin فعال شد.");
        } else {
          showToast("رمز عبور اشتباه است! (پیش‌فرض: 1234)");
        }
      });
      return;
    }

    container.innerHTML = `
      <div class="admin-shell">
        <div class="admin-topbar">
          <div class="admin-title-area">
            <span class="admin-badge">/admin CMS</span>
            <h3 style="color:#fff; font-size:1.15rem;">مدیریت یکپارچه سایت 1ud.ir (بدون نیاز به بک‌اند)</h3>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            <button class="btn btn-primary" onclick="saveAllAdminChanges()" style="padding:8px 18px; font-size:0.88rem;">
              ✓ ذخیره و اعمال آنی
            </button>
            <button class="btn btn-outline" onclick="exportSiteDataJsFile()" style="padding:8px 16px; font-size:0.86rem;" title="دانلود فایل site-data.js برای قرار دادن دائمی روی هاست">
              ⬇ خروجی دائمی (site-data.js)
            </button>
            <button class="btn btn-outline" onclick="closeAdminModal()" style="padding:8px 14px; font-size:0.86rem;">
              ✕ مشاهده سایت
            </button>
          </div>
        </div>

        <div class="admin-layout">
          <aside class="admin-sidebar">
            <button class="admin-tab-btn active" data-tab="tab-hero">۱. اطلاعات من و هدر</button>
            <button class="admin-tab-btn" data-tab="tab-projects">۲. پروژه‌ها و نمونه‌کارها</button>
            <button class="admin-tab-btn" data-tab="tab-skills">۳. مهارت‌ها و تخصص‌ها</button>
            <button class="admin-tab-btn" data-tab="tab-about">۴. درباره من و خدمات</button>
            <button class="admin-tab-btn" data-tab="tab-exp">۵. سوابق کاری (Timeline)</button>
            <button class="admin-tab-btn" data-tab="tab-contact">۶. راه‌های ارتباطی</button>
            <button class="admin-tab-btn" data-tab="tab-theme">۷. طیف رنگ، رمز و خروجی</button>
          </aside>

          <main class="admin-content">
            <!-- TAB 1: HERO -->
            <div class="admin-pane active" id="tab-hero">
              <h3 style="margin-bottom:18px; color:var(--light-blue);">ویرایش اطلاعات اصلی و بخش معرفی (Hero)</h3>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>نام سایت / دامنه</label>
                  <input class="form-control" id="adm-siteName" value="${escapeHtml(data.meta?.siteName)}" />
                </div>
                <div class="form-group">
                  <label>نام کوتاه برند (لوگو)</label>
                  <input class="form-control" id="adm-brandShort" value="${escapeHtml(data.meta?.brandShort)}" />
                </div>
              </div>
              <div class="form-group">
                <label>عنوان تب مرورگر (SEO Title)</label>
                <input class="form-control" id="adm-pageTitle" value="${escapeHtml(data.meta?.pageTitle)}" />
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>متن وضعیت (Badge بالای هدر)</label>
                  <input class="form-control" id="adm-badge" value="${escapeHtml(data.hero?.badge)}" />
                </div>
                <div class="form-group">
                  <label>جمله خوش‌آمدگویی</label>
                  <input class="form-control" id="adm-greeting" value="${escapeHtml(data.hero?.greeting)}" />
                </div>
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>نام اصلی شما یا برند</label>
                  <input class="form-control" id="adm-heroName" value="${escapeHtml(data.hero?.name)}" />
                </div>
                <div class="form-group">
                  <label>عنوان تخصصی (سمت/مهارت اصلی)</label>
                  <input class="form-control" id="adm-roleTitle" value="${escapeHtml(data.hero?.roleTitle)}" />
                </div>
              </div>
              <div class="form-group">
                <label>بیوگرافی کوتاه هدر</label>
                <textarea class="form-control" id="adm-heroBio" rows="3">${escapeHtml(data.hero?.bio)}</textarea>
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>لینک تصویر پروفایل (یا آپلود مستقیم از سیستم)</label>
                  <input class="form-control" id="adm-avatarUrl" value="${escapeHtml(data.hero?.avatarUrl)}" />
                </div>
                <div class="form-group">
                  <label>آپلود عکس پروفایل از کامپیوتر/موبایل (بدون نیاز به سرور)</label>
                  <input type="file" accept="image/*" class="form-control" onchange="handleImageUpload(this, 'adm-avatarUrl')" />
                </div>
              </div>
              <h4 style="margin: 18px 0 12px; color: var(--cyan-glow);">آمارهای کلیدی (۴ کارت زیر هدر)</h4>
              <div class="admin-row-2" id="adm-stats-list">
                ${(data.hero?.stats || [])
                  .map(
                    (st, i) => `
                  <div class="admin-card-item">
                    <label style="font-size:0.8rem; color:var(--text-muted);">کارت آمار ${i + 1}</label>
                    <div style="display:flex; gap:8px; margin-top:6px;">
                      <input class="form-control stat-val-inp" placeholder="مقدار (مثلا +۲۵)" value="${escapeHtml(st.value)}" />
                      <input class="form-control stat-lbl-inp" placeholder="عنوان (مثلا پروژه موفق)" value="${escapeHtml(st.label)}" />
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- TAB 2: PROJECTS -->
            <div class="admin-pane" id="tab-projects">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                <h3 style="color:var(--light-blue);">مدیریت پروژه‌ها و نمونه‌کارها</h3>
                <button class="btn btn-primary" onclick="addProjectCardAdmin()" style="padding:8px 16px; font-size:0.85rem;">+ افزودن پروژه جدید</button>
              </div>
              <div id="adm-projects-container"></div>
            </div>

            <!-- TAB 3: SKILLS -->
            <div class="admin-pane" id="tab-skills">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                <h3 style="color:var(--light-blue);">مدیریت مهارت‌ها و کارهایی که بلدید</h3>
                <button class="btn btn-primary" onclick="addSkillCardAdmin()" style="padding:8px 16px; font-size:0.85rem;">+ افزودن مهارت جدید</button>
              </div>
              <div id="adm-skills-container"></div>
            </div>

            <!-- TAB 4: ABOUT & SERVICES -->
            <div class="admin-pane" id="tab-about">
              <h3 style="margin-bottom:16px; color:var(--light-blue);">بخش درباره من و خدمات قابل ارائه</h3>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>عنوان بخش درباره من</label>
                  <input class="form-control" id="adm-aboutTitle" value="${escapeHtml(data.about?.title)}" />
                </div>
                <div class="form-group">
                  <label>زیرعنوان درباره من</label>
                  <input class="form-control" id="adm-aboutSubtitle" value="${escapeHtml(data.about?.subtitle)}" />
                </div>
              </div>
              <div class="form-group">
                <label>متن کامل درباره من</label>
                <textarea class="form-control" id="adm-aboutDesc" rows="3">${escapeHtml(data.about?.description)}</textarea>
              </div>
              <div class="form-group">
                <label>نکات کلیدی درباره من (هر خط یک ویژگی)</label>
                <textarea class="form-control" id="adm-aboutHighlights" rows="4">${escapeHtml((data.about?.highlights || []).join("\n"))}</textarea>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin:22px 0 12px;">
                <h4 style="color:var(--cyan-glow);">خدمات تخصصی من</h4>
                <button class="btn btn-outline" onclick="addServiceCardAdmin()" style="padding:6px 14px; font-size:0.82rem;">+ افزودن خدمت</button>
              </div>
              <div id="adm-services-container"></div>
            </div>

            <!-- TAB 5: EXPERIENCES -->
            <div class="admin-pane" id="tab-exp">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                <h3 style="color:var(--light-blue);">سوابق کاری و مسیر حرفه‌ای</h3>
                <button class="btn btn-primary" onclick="addExpCardAdmin()" style="padding:8px 16px; font-size:0.85rem;">+ افزودن سابقه جدید</button>
              </div>
              <div id="adm-exp-container"></div>
            </div>

            <!-- TAB 6: CONTACT -->
            <div class="admin-pane" id="tab-contact">
              <h3 style="margin-bottom:18px; color:var(--light-blue);">راه‌های ارتباطی و شبکه‌های اجتماعی</h3>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>ایمیل</label>
                  <input class="form-control" id="adm-email" value="${escapeHtml(data.contact?.email)}" />
                </div>
                <div class="form-group">
                  <label>شماره تماس</label>
                  <input class="form-control" id="adm-phone" value="${escapeHtml(data.contact?.phone)}" />
                </div>
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>لینک تلگرام</label>
                  <input class="form-control" id="adm-telegram" value="${escapeHtml(data.contact?.telegram)}" />
                </div>
                <div class="form-group">
                  <label>لینک گیت‌هاب (GitHub)</label>
                  <input class="form-control" id="adm-github" value="${escapeHtml(data.contact?.github)}" />
                </div>
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>لینک لینکدین (LinkedIn)</label>
                  <input class="form-control" id="adm-linkedin" value="${escapeHtml(data.contact?.linkedin)}" />
                </div>
                <div class="form-group">
                  <label>موقعیت مکانی</label>
                  <input class="form-control" id="adm-location" value="${escapeHtml(data.contact?.location)}" />
                </div>
              </div>
              <div class="form-group">
                <label>متن کپی‌رایت فوتر</label>
                <input class="form-control" id="adm-footerNote" value="${escapeHtml(data.contact?.footerNote)}" />
              </div>
            </div>

            <!-- TAB 7: THEME & EXPORT -->
            <div class="admin-pane" id="tab-theme">
              <h3 style="margin-bottom:18px; color:var(--light-blue);">تنظیمات طیف رنگی (مشکی + آبی تیره و روشن) و انتشار</h3>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>پس‌زمینه مشکی اصلی (Primary Black)</label>
                  <input type="color" class="form-control" id="adm-bgPrimary" value="${escapeHtml(data.theme?.bgPrimary || '#04070d')}" style="height:46px;" />
                </div>
                <div class="form-group">
                  <label>آبی تیره نوارها و کارت‌ها (Dark Blue)</label>
                  <input type="color" class="form-control" id="adm-darkBlue" value="${escapeHtml(data.theme?.darkBlue || '#0d2847')}" style="height:46px;" />
                </div>
              </div>
              <div class="admin-row-2">
                <div class="form-group">
                  <label>آبی میانی گرادینت (Mid Blue)</label>
                  <input type="color" class="form-control" id="adm-midBlue" value="${escapeHtml(data.theme?.midBlue || '#1d4ed8')}" style="height:46px;" />
                </div>
                <div class="form-group">
                  <label>آبی روشن نئونی و شدوها (Light Blue Glow)</label>
                  <input type="color" class="form-control" id="adm-lightBlue" value="${escapeHtml(data.theme?.lightBlue || '#00d4ff')}" style="height:46px;" />
                </div>
              </div>
              <div class="form-group" style="margin-top:12px;">
                <label>تغییر رمز عبور پنل /admin</label>
                <input type="text" class="form-control" id="adm-adminPin" value="${escapeHtml(data.meta?.adminPin || '1234')}" style="max-width:260px;" />
              </div>

              <div class="admin-card-item" style="margin-top:24px; border-color:var(--light-blue);">
                <h4 style="color:#fff; margin-bottom:8px;">چطور تغییرات روی هاست معمولی (بدون بک‌اند) برای همه دائمی شود؟</h4>
                <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:14px;">
                  ۱. دکمه <strong>«ذخیره و اعمال آنی»</strong> تمام تغییرات را بلافاصله در مرورگر شما ذخیره و نمایش می‌دهد.<br/>
                  ۲. برای اینکه تغییرات بدون نیاز به دیتابیس و بک‌اند برای تمام بازدیدکنندگان سایت <code>1ud.ir</code> نمایش داده شود، کافیست روی دکمه <strong>«خروجی دائمی (site-data.js)»</strong> کلیک کنید و فایل دانلودشده را در پوشه <code>assets/js/site-data.js</code> هاست خود جایگزین نمایید.
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:12px;">
                  <button class="btn btn-primary" onclick="exportSiteDataJsFile()">دانلود فایل آماده site-data.js</button>
                  <button class="btn btn-outline" onclick="exportJsonBackup()">دانلود بکاپ JSON</button>
                  <button class="btn-danger" onclick="resetToDefaultData()">بازگردانی به اطلاعات پیش‌فرض</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;

    // Populate dynamic lists
    renderAdminProjectsList(data.projects || []);
    renderAdminSkillsList(data.skills || []);
    renderAdminServicesList(data.services || []);
    renderAdminExpList(data.experiences || []);

    // Setup Tab Switching
    container.querySelectorAll(".admin-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".admin-tab-btn").forEach((b) => b.classList.remove("active"));
        container.querySelectorAll(".admin-pane").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const target = document.getElementById(btn.getAttribute("data-tab"));
        if (target) target.classList.add("active");
      });
    });
  }

  window.handleImageUpload = function (inputEl, targetInputId) {
    const file = inputEl.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const target = document.getElementById(targetInputId);
      if (target) {
        target.value = evt.target.result;
        showToast("تصویر با موفقیت به فرمت داخلی تبدیل شد!");
      }
    };
    reader.readAsDataURL(file);
  };

  function renderAdminProjectsList(projects) {
    const wrap = document.getElementById("adm-projects-container");
    if (!wrap) return;
    wrap.innerHTML = projects
      .map(
        (pr, idx) => `
      <div class="admin-card-item proj-edit-card">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <strong style="color:var(--cyan-glow);">پروژه #${idx + 1}</strong>
          <button type="button" class="btn-danger" onclick="this.closest('.proj-edit-card').remove()">حذف پروژه</button>
        </div>
        <div class="admin-row-2">
          <div class="form-group">
            <label>عنوان پروژه</label>
            <input class="form-control pr-title" value="${escapeHtml(pr.title)}" />
          </div>
          <div class="form-group">
            <label>دسته‌بندی (مثلا: وب اپلیکیشن، رابط کاربری)</label>
            <input class="form-control pr-cat" value="${escapeHtml(pr.category)}" />
          </div>
        </div>
        <div class="form-group">
          <label>توضیحات پروژه</label>
          <textarea class="form-control pr-desc" rows="2">${escapeHtml(pr.description)}</textarea>
        </div>
        <div class="admin-row-2">
          <div class="form-group">
            <label>تکنولوژی‌ها (با کاما , جدا کنید)</label>
            <input class="form-control pr-tags" value="${escapeHtml(Array.isArray(pr.tags) ? pr.tags.join(', ') : pr.tags)}" />
          </div>
          <div class="form-group">
            <label>سال / تاریخ اجرا</label>
            <input class="form-control pr-date" value="${escapeHtml(pr.date || '۱۴۰۴')}" />
          </div>
        </div>
        <div class="admin-row-2">
          <div class="form-group">
            <label>لینک تصویر پروژه</label>
            <input class="form-control pr-img" id="pr-img-${idx}" value="${escapeHtml(pr.image)}" />
          </div>
          <div class="form-group">
            <label>یا آپلود تصویر پروژه از سیستم</label>
            <input type="file" accept="image/*" class="form-control" onchange="handleImageUpload(this, 'pr-img-${idx}')" />
          </div>
        </div>
        <div class="admin-row-2">
          <div class="form-group">
            <label>لینک دمو آنلاین (Live URL)</label>
            <input class="form-control pr-live" value="${escapeHtml(pr.liveUrl)}" />
          </div>
          <div class="form-group">
            <label>لینک سورس / گیت‌هاب</label>
            <input class="form-control pr-repo" value="${escapeHtml(pr.repoUrl)}" />
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  window.addProjectCardAdmin = function () {
    const wrap = document.getElementById("adm-projects-container");
    if (!wrap) return;
    const idx = Date.now();
    const div = document.createElement("div");
    div.className = "admin-card-item proj-edit-card";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <strong style="color:var(--light-blue);">پروژه جدید</strong>
        <button type="button" class="btn-danger" onclick="this.closest('.proj-edit-card').remove()">حذف پروژه</button>
      </div>
      <div class="admin-row-2">
        <div class="form-group"><label>عنوان پروژه</label><input class="form-control pr-title" value="پروژه جدید من" /></div>
        <div class="form-group"><label>دسته‌بندی</label><input class="form-control pr-cat" value="وب اپلیکیشن" /></div>
      </div>
      <div class="form-group"><label>توضیحات پروژه</label><textarea class="form-control pr-desc" rows="2">توضیحات مربوط به امکانات و تکنولوژی‌های این پروژه...</textarea></div>
      <div class="admin-row-2">
        <div class="form-group"><label>تکنولوژی‌ها (با کاما جدا کنید)</label><input class="form-control pr-tags" value="React, Tailwind, JS" /></div>
        <div class="form-group"><label>تاریخ</label><input class="form-control pr-date" value="۱۴۰۴" /></div>
      </div>
      <div class="admin-row-2">
        <div class="form-group"><label>لینک تصویر</label><input class="form-control pr-img" id="pr-img-${idx}" value="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80" /></div>
        <div class="form-group"><label>آپلود تصویر</label><input type="file" accept="image/*" class="form-control" onchange="handleImageUpload(this, 'pr-img-${idx}')" /></div>
      </div>
      <div class="admin-row-2">
        <div class="form-group"><label>لینک دمو آنلاین</label><input class="form-control pr-live" value="https://1ud.ir" /></div>
        <div class="form-group"><label>لینک سورس</label><input class="form-control pr-repo" value="https://github.com" /></div>
      </div>
    `;
    wrap.prepend(div);
  };

  function renderAdminSkillsList(skills) {
    const wrap = document.getElementById("adm-skills-container");
    if (!wrap) return;
    wrap.innerHTML = skills
      .map(
        (sk) => `
      <div class="admin-card-item skill-edit-card" style="display:grid; grid-template-columns: 2fr 1.2fr 1fr 1fr auto; gap:10px; align-items:end;">
        <div><label style="font-size:0.8rem;">نام مهارت</label><input class="form-control sk-name" value="${escapeHtml(sk.name)}" /></div>
        <div><label style="font-size:0.8rem;">دسته‌بندی</label><input class="form-control sk-cat" value="${escapeHtml(sk.category)}" /></div>
        <div><label style="font-size:0.8rem;">درصد (0-100)</label><input type="number" min="0" max="100" class="form-control sk-lvl" value="${escapeHtml(sk.level)}" /></div>
        <div><label style="font-size:0.8rem;">سطح</label><input class="form-control sk-badge" value="${escapeHtml(sk.badge || 'حرفه‌ای')}" /></div>
        <button type="button" class="btn-danger" onclick="this.closest('.skill-edit-card').remove()">حذف</button>
      </div>
    `
      )
      .join("");
  }

  window.addSkillCardAdmin = function () {
    const wrap = document.getElementById("adm-skills-container");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "admin-card-item skill-edit-card";
    div.style.cssText = "display:grid; grid-template-columns: 2fr 1.2fr 1fr 1fr auto; gap:10px; align-items:end;";
    div.innerHTML = `
      <div><label style="font-size:0.8rem;">نام مهارت</label><input class="form-control sk-name" value="مهارت جدید" /></div>
      <div><label style="font-size:0.8rem;">دسته‌بندی</label><input class="form-control sk-cat" value="فرانت‌اند" /></div>
      <div><label style="font-size:0.8rem;">درصد (0-100)</label><input type="number" min="0" max="100" class="form-control sk-lvl" value="90" /></div>
      <div><label style="font-size:0.8rem;">سطح</label><input class="form-control sk-badge" value="حرفه‌ای" /></div>
      <button type="button" class="btn-danger" onclick="this.closest('.skill-edit-card').remove()">حذف</button>
    `;
    wrap.prepend(div);
  };

  function renderAdminServicesList(services) {
    const wrap = document.getElementById("adm-services-container");
    if (!wrap) return;
    wrap.innerHTML = services
      .map(
        (sv) => `
      <div class="admin-card-item sv-edit-card">
        <div style="display:flex; justify-content:space-between; gap:10px; margin-bottom:8px;">
          <input class="form-control sv-title" placeholder="عنوان خدمت" value="${escapeHtml(sv.title)}" />
          <button type="button" class="btn-danger" onclick="this.closest('.sv-edit-card').remove()">حذف</button>
        </div>
        <textarea class="form-control sv-desc" rows="2" placeholder="توضیح خدمت">${escapeHtml(sv.description)}</textarea>
      </div>
    `
      )
      .join("");
  }

  window.addServiceCardAdmin = function () {
    const wrap = document.getElementById("adm-services-container");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "admin-card-item sv-edit-card";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:10px; margin-bottom:8px;">
        <input class="form-control sv-title" value="خدمت تخصصی جدید" />
        <button type="button" class="btn-danger" onclick="this.closest('.sv-edit-card').remove()">حذف</button>
      </div>
      <textarea class="form-control sv-desc" rows="2">توضیحات خدمت...</textarea>
    `;
    wrap.prepend(div);
  };

  function renderAdminExpList(exps) {
    const wrap = document.getElementById("adm-exp-container");
    if (!wrap) return;
    wrap.innerHTML = exps
      .map(
        (ex) => `
      <div class="admin-card-item ex-edit-card">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <strong style="color:var(--cyan-glow);">سابقه کاری</strong>
          <button type="button" class="btn-danger" onclick="this.closest('.ex-edit-card').remove()">حذف</button>
        </div>
        <div class="admin-row-2">
          <div class="form-group"><label>سمت / نقش</label><input class="form-control ex-role" value="${escapeHtml(ex.role)}" /></div>
          <div class="form-group"><label>بازه زمانی</label><input class="form-control ex-period" value="${escapeHtml(ex.period)}" /></div>
        </div>
        <div class="form-group"><label>نام شرکت / مجموعه</label><input class="form-control ex-company" value="${escapeHtml(ex.company)}" /></div>
        <div class="form-group"><label>توضیحات</label><textarea class="form-control ex-desc" rows="2">${escapeHtml(ex.description)}</textarea></div>
      </div>
    `
      )
      .join("");
  }

  window.addExpCardAdmin = function () {
    const wrap = document.getElementById("adm-exp-container");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "admin-card-item ex-edit-card";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <strong style="color:var(--light-blue);">سابقه جدید</strong>
        <button type="button" class="btn-danger" onclick="this.closest('.ex-edit-card').remove()">حذف</button>
      </div>
      <div class="admin-row-2">
        <div class="form-group"><label>سمت / نقش</label><input class="form-control ex-role" value="توسعه‌دهنده ارشد" /></div>
        <div class="form-group"><label>بازه زمانی</label><input class="form-control ex-period" value="۱۴۰۳ - اکنون" /></div>
      </div>
      <div class="form-group"><label>شرکت / مجموعه</label><input class="form-control ex-company" value="1ud.ir" /></div>
      <div class="form-group"><label>توضیحات</label><textarea class="form-control ex-desc" rows="2">شرح فعالیت‌ها و دستاوردها...</textarea></div>
    `;
    wrap.prepend(div);
  };

  function collectFormData() {
    const current = getSiteData();
    const val = (id) => document.getElementById(id)?.value || "";

    const stats = [];
    document.querySelectorAll("#adm-stats-list .admin-card-item").forEach((card, i) => {
      stats.push({
        id: "st" + i,
        value: card.querySelector(".stat-val-inp")?.value || "",
        label: card.querySelector(".stat-lbl-inp")?.value || ""
      });
    });

    const projects = [];
    document.querySelectorAll("#adm-projects-container .proj-edit-card").forEach((card, i) => {
      projects.push({
        id: "pr" + i,
        title: card.querySelector(".pr-title")?.value || "",
        category: card.querySelector(".pr-cat")?.value || "وب",
        description: card.querySelector(".pr-desc")?.value || "",
        tags: (card.querySelector(".pr-tags")?.value || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        date: card.querySelector(".pr-date")?.value || "",
        image: card.querySelector(".pr-img")?.value || "",
        liveUrl: card.querySelector(".pr-live")?.value || "",
        repoUrl: card.querySelector(".pr-repo")?.value || "",
        featured: true
      });
    });

    const skills = [];
    document.querySelectorAll("#adm-skills-container .skill-edit-card").forEach((card, i) => {
      skills.push({
        id: "sk" + i,
        name: card.querySelector(".sk-name")?.value || "",
        category: card.querySelector(".sk-cat")?.value || "عمومی",
        level: Number(card.querySelector(".sk-lvl")?.value || 85),
        badge: card.querySelector(".sk-badge")?.value || "حرفه‌ای"
      });
    });

    const services = [];
    document.querySelectorAll("#adm-services-container .sv-edit-card").forEach((card, i) => {
      services.push({
        id: "sv" + i,
        title: card.querySelector(".sv-title")?.value || "",
        description: card.querySelector(".sv-desc")?.value || ""
      });
    });

    const experiences = [];
    document.querySelectorAll("#adm-exp-container .ex-edit-card").forEach((card, i) => {
      experiences.push({
        id: "ex" + i,
        role: card.querySelector(".ex-role")?.value || "",
        period: card.querySelector(".ex-period")?.value || "",
        company: card.querySelector(".ex-company")?.value || "",
        description: card.querySelector(".ex-desc")?.value || ""
      });
    });

    return {
      meta: {
        siteName: val("adm-siteName") || "1ud.ir",
        brandShort: val("adm-brandShort") || "1UD",
        pageTitle: val("adm-pageTitle") || "1ud.ir",
        adminPin: val("adm-adminPin") || "1234"
      },
      theme: {
        bgPrimary: val("adm-bgPrimary") || "#04070d",
        bgSecondary: "#08101f",
        darkBlue: val("adm-darkBlue") || "#0d2847",
        midBlue: val("adm-midBlue") || "#1d4ed8",
        lightBlue: val("adm-lightBlue") || "#00d4ff",
        cyanGlow: "#38bdf8"
      },
      hero: {
        badge: val("adm-badge"),
        greeting: val("adm-greeting"),
        name: val("adm-heroName"),
        roleTitle: val("adm-roleTitle"),
        bio: val("adm-heroBio"),
        avatarUrl: val("adm-avatarUrl"),
        primaryCtaText: current.hero?.primaryCtaText || "مشاهده پروژه‌ها",
        primaryCtaLink: "#projects",
        secondaryCtaText: current.hero?.secondaryCtaText || "ارتباط با من",
        secondaryCtaLink: "#contact",
        stats
      },
      about: {
        title: val("adm-aboutTitle"),
        subtitle: val("adm-aboutSubtitle"),
        description: val("adm-aboutDesc"),
        highlights: val("adm-aboutHighlights")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      },
      skills,
      projects,
      experiences,
      services,
      contact: {
        email: val("adm-email"),
        phone: val("adm-phone"),
        telegram: val("adm-telegram"),
        github: val("adm-github"),
        linkedin: val("adm-linkedin"),
        location: val("adm-location"),
        footerNote: val("adm-footerNote")
      }
    };
  }

  window.saveAllAdminChanges = function () {
    const updated = collectFormData();
    saveSiteData(updated);
    renderSite(updated);
    showToast("تغییرات با موفقیت ذخیره و در سایت اعمال شد!");
  };

  window.exportSiteDataJsFile = function () {
    const updated = collectFormData();
    saveSiteData(updated);
    renderSite(updated);
    const content =
      "/**\n * فایل داده‌های به‌روزشده سایت 1ud.ir (تولیدشده توسط پنل /admin)\n * این فایل را در مسیر assets/js/site-data.js هاست خود جایگزین کنید.\n */\nwindow.DEFAULT_SITE_DATA = " +
      JSON.stringify(updated, null, 2) +
      ";\n";
    const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site-data.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("فایل site-data.js دانلود شد! آن را در پوشه assets/js هاست جایگزین کنید.");
  };

  window.exportJsonBackup = function () {
    const updated = collectFormData();
    const blob = new Blob([JSON.stringify(updated, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "1ud-backup.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("فایل پشتیبان JSON دانلود شد.");
  };

  window.resetToDefaultData = function () {
    if (!confirm("آیا مطمئن هستید که می‌خواهید اطلاعات مرورگر را به حالت پیش‌فرض فایل site-data.js برگردانید؟")) return;
    localStorage.removeItem(STORAGE_KEY);
    renderSite(window.DEFAULT_SITE_DATA);
    renderAdminShell();
    showToast("اطلاعات به حالت پیش‌فرض بازگردانی شد.");
  };
})();
