export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/login', '/'];

  if (!import.meta.client) return; // ⬅️ pastikan di client saja!

  const token = localStorage.getItem('token');
  const expiresTime = parseInt(localStorage.getItem('expires_at') || '0', 10);
  const now = Date.now();

  // Pastikan console.log juga hanya ketika client
  console.log('Now:', now);
  console.log('Expires at (string):', localStorage.getItem('expires_at'));
  console.log('Expires at (parsed):', expiresTime);

  if (expiresTime && now > expiresTime) {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    return navigateTo('/login');
  }

  if (!token && !publicPages.includes(to.path)) {
    return navigateTo('/login');
  }
});
