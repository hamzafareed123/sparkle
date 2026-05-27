"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseServiceBody = parseServiceBody;
function parseServiceBody(req, partial = false) {
    const { name, slug, description, price, duration, isActive } = req.body;
    const data = {};
    if (!partial || name !== undefined)
        data.name = String(name ?? '').trim();
    if (!partial || slug !== undefined)
        data.slug = String(slug ?? '').trim().toLowerCase();
    if (!partial || description !== undefined)
        data.description = String(description ?? '').trim();
    if (!partial || price !== undefined)
        data.price = Number(price);
    if (!partial || duration !== undefined)
        data.duration = String(duration ?? '').trim();
    if (!partial || isActive !== undefined) {
        data.isActive = isActive === true || isActive === 'true';
    }
    if (req.file) {
        data.image = `/uploads/service-images/${req.file.filename}`;
    }
    return data;
}
//# sourceMappingURL=parseServiceBody.js.map