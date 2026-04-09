import { header } from "../../components/header.js"
import { footer } from "../../components/footer.js"

header()
footer()

const account = (() => {
    try { return JSON.parse(sessionStorage.getItem("log-datas")) } catch { return null }
})()

const card = document.getElementById("profile-card")

if (!account) {
    card.innerHTML = `
        <div class="profile-no-user">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3657cb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
            <p>You are not logged in</p>
            <button class="profile-login-redirect" onclick="window.location.href='/'">Go to main page</button>
        </div>
    `
} else {
    
    const nameParts = account.name.trim().split(" ")
    const firstName = nameParts[0] || account.name
    const lastName = nameParts.slice(1).join(" ") || ""

    const initials = account.name
        .split(" ")
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    const hasAvatar = account.avatarUrl && account.avatarUrl !== "https://kinoarea.com/front/img/comment-no-author.png"

    card.innerHTML = `
        <div class="profile-avatar-block" id="profile-avatar-block">
            ${hasAvatar
                ? `<img src="${account.avatarUrl}" alt="avatar" class="profile-avatar-img-main" id="profile-img-main"
                       onerror="this.style.display='none'; document.getElementById('profile-initials-placeholder').style.display='flex';">`
                : `<div class="profile-avatar-placeholder" id="profile-initials-placeholder">${initials}</div>`
            }
            ${!hasAvatar ? '' : `<div class="profile-avatar-placeholder" id="profile-initials-placeholder" style="display:none">${initials}</div>`}
            <div class="profile-avatar-edit-overlay">
                <label class="profile-avatar-edit-btn" title="Change avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    Change photo
                    <input type="file" accept="image/*" id="avatar-upload" style="display:none">
                </label>
            </div>
        </div>

        <div class="profile-info-block">
            <div class="profile-name-display">
                <span class="profile-name-first">${firstName} </span><span class="profile-name-last">${lastName || firstName}</span>
            </div>

            <div class="profile-info-row">
                <span class="profile-info-label">Gender:</span>
                <span class="profile-info-value">Not specified</span>
            </div>

            <div class="profile-info-row">
                <span class="profile-info-label">Email:</span>
                <span class="profile-info-value email-val">${account.email}</span>
            </div>

            <button class="profile-logout-btn" id="profile-logout">Log out</button>
        </div>
    `

    // Avatar upload
    const uploadInput = document.getElementById("avatar-upload")
    if (uploadInput) {
        uploadInput.addEventListener("change", (e) => {
            const file = e.target.files[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = (ev) => {
                const url = ev.target.result

                // Update or insert img
                let imgMain = document.getElementById("profile-img-main")
                const placeholder = document.getElementById("profile-initials-placeholder")
                const block = document.getElementById("profile-avatar-block")

                if (!imgMain) {
                    imgMain = document.createElement("img")
                    imgMain.id = "profile-img-main"
                    imgMain.className = "profile-avatar-img-main"
                    imgMain.alt = "avatar"
                    block.insertBefore(imgMain, block.firstChild)
                }
                imgMain.src = url
                imgMain.style.display = "block"
                if (placeholder) placeholder.style.display = "none"

                const updated = { ...account, avatarUrl: url }
                sessionStorage.setItem("log-datas", JSON.stringify(updated))
            }
            reader.readAsDataURL(file)
        })
    }

    // Logout
    document.getElementById("profile-logout").addEventListener("click", () => {
        sessionStorage.removeItem("log-datas")
        window.location.href = "/"
    })

    // Settings button (placeholder)
    const settingsBtn = document.getElementById("profile-settings-btn")
    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
            alert("Settings coming soon!")
        })
    }
}
