import { useState, useEffect } from "react";
import {
    createDashboardListing,
    updateDashboardListing,
} from "../api/axios";

function DashboardListingForm({ token, onSuccess, editingListing, setEditingListing }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        images: [],
    });

    useEffect(() => {
        if (editingListing) {
            setForm({
                title: editingListing.title,
                description: editingListing.description,
                price: editingListing.price,
                location: editingListing.location,
                images: [],
            });
        }
    }, [editingListing]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (key === "images") {
                form.images.forEach((img) => formData.append("listing[images][]", img));
            } else {
                formData.append(`listing[${key}]`, form[key]);
            }
        });

        try {
            if (editingListing) {
                await updateDashboardListing(editingListing.id, formData, token);
                setEditingListing(null);
            } else {
                await createDashboardListing(formData, token);
            }
            setForm({ title: "", description: "", price: "", location: "", images: [] });
            onSuccess();
        } catch (err) {
            console.error("Save failed", err);
        }
    };

    return (
        <form className="dashboard-form" onSubmit={handleSubmit}>
            <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />
            <input
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
            />
            <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
            />
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit">
                {editingListing ? "Update Listing" : "Create Listing"}
            </button>
            {editingListing && (
                <button type="button" onClick={() => setEditingListing(null)}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default DashboardListingForm;
