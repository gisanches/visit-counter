# Dynamic Visit Counter

This project is a simple and elegant **visit counter** using **Supabase** (PostgreSQL) for data storage and **Vercel Functions** to expose HTTP endpoints. The data is consumed by **Shields.io**, allowing you to generate a dynamic badge for display in your GitHub README.

## 🚀 Features

* **Visit Incrementation**: Endpoint that increments and returns the total visit count.
* **JSON Endpoint for Shields.io**: Provides data in the JSON format expected by Shields.io.
* **Dynamic Badge**: Integration with Shields.io to generate an automatically updated badge.
* **Cache Control**: Adjustable `cacheSeconds` parameter to define badge refresh frequency.

## 📦 Project Structure

```bash
├── api
│   ├── visits-increment.js      # Endpoint that increments the counter and returns an SVG badge
│   └── visits-json.js           # Endpoint that returns JSON for Shields.io
├── lib
│   └── supabase.js              # Supabase client configuration
├── .env                         # Environment variables (do not commit!)
└── README.md                    # This file
```

## 🛠️ Prerequisites

* Node.js ≥ 16
* A Supabase account with a `visits` table:

  ```sql
  CREATE TABLE public.visits (
    id INT PRIMARY KEY,
    count INT DEFAULT 0
  );
  INSERT INTO public.visits (id, count)
  VALUES (1, 0)
  ON CONFLICT (id) DO NOTHING;
  ```
* Environment variables set in Vercel (or locally):

  ```bash
  SUPABASE_URL=https://YOUR_PROJECT.supabase.co
  SUPABASE_ANON_KEY=YOUR_ANON_KEY
  ```

## ⚙️ Installation and Deployment

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/visit-counter.git
   cd visit-counter
   ```
2. Install dependencies (local):

   ```bash
   npm install
   ```
3. Configure environment variables:

   * Create a `.env` file at the root or set them in the Vercel dashboard.
4. Deploy to Vercel:

   ```bash
   vercel login
   vercel --prod
   ```

## 🔗 Endpoints

* **Increment + SVG Badge**:
  `https://your-domain.vercel.app/api/visits-increment`
  Returns an SVG badge that increments the counter on each access.

* **JSON for Shields.io**:
  `https://your-domain.vercel.app/api/visits-json`
  Returns JSON in the following format:

  ```json
  {
    "schemaVersion": 1,
    "label": "visits",
    "message": "123",
    "color": "8a63d2"
  }
  ```

## 📄 Usage in README.md

To display the badge in your GitHub README, add:

```html
<p align="center">
  <img src="https://img.shields.io/endpoint?url=https://your-domain.vercel.app/api/visits-json&cacheSeconds=60" alt="Visits" />
</p>
```

* **`cacheSeconds`**: Number of seconds before Shields.io re-fetches the JSON.

## 📝 Customization

* Change the **badge color** by updating the `color` field in the JSON.
* Modify the **label text** as needed.
* Adjust **`cacheSeconds`** to control how often the badge updates.

## 📑 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by [Giovanna Sanches](https://github.com/gisanches)
