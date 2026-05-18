## ETL vs ELT

**ETL (Extract, Transform, Load)** transforms data _before_ loading it into the warehouse, while **ELT (Extract, Load, Transform)** loads raw data first into the target system and transforms it _there_, on demand.

### Key Differences

| Feature             | ETL                                | ELT                                               |
| ------------------- | ---------------------------------- | ------------------------------------------------- |
| Transform location  | Separate staging/processing server | Inside the data warehouse itself                  |
| Speed to load       | Slower (must transform first)      | Faster (load immediately)                         |
| Raw data retention  | No — only transformed data stored  | Yes — full raw data available                     |
| Data types          | Best with structured data          | Handles structured, semi-structured, unstructured |
| Flexibility         | Low (schema defined upfront)       | High (re-query raw data anytime)                  |
| Security/Compliance | Easier (mask data before storage)  | Requires care (raw data sits in warehouse)        |
| Best for            | Legacy systems, strict compliance  | Big data, cloud-native, modern analytics          |

### Practical Learning Path

As an AI engineer already working with FastAPI and PostgreSQL, the fastest way to get hands-on is:

1. **Build a mini ETL pipeline** — pull data from a public API (e.g., OpenWeatherMap), transform it in Python with `pandas`, and load it into PostgreSQL
2. **Rebuild it as ELT** — load the raw JSON directly into a table, then use SQL views or `dbt` to transform it inside the DB; this mirrors exactly what modern cloud warehouses do
3. **Use dbt (data build tool)** — it's the industry standard for the "T" in ELT; you write SQL models and dbt handles lineage, testing, and documentation
4. **Try a free cloud warehouse tier** — Snowflake, BigQuery, or AWS Redshift Serverless all have free tiers perfect for practicing ELT at scale
5. **Explore Apache Airflow** for orchestrating pipelines — it fits naturally with your existing Python/FastAPI skills

---

## Data Types in This Context

### Structured Data

Rows and columns with a fixed schema — think PostgreSQL tables, Excel sheets, or financial records. Every field is predefined, easily queried with standard SQL, and is what ETL was originally designed for.

```
| customer_id | name   | age | premium |
|-------------|--------|-----|---------|
| 001         | Ahmad  | 34  | 1200.00 |
```

### Semi-Structured Data

Has _some_ organization (tags, key-value pairs) but no rigid schema. This is what you likely already work with daily — JSON from API responses, XML, CSV with nested fields, Parquet files, or IoT sensor payloads. ELT handles this natively since modern warehouses can store and query JSON columns directly.

```json
{
  "policy_id": "P123",
  "holder": { "name": "Ahmad" },
  "claims": [{ "date": "2025-01" }]
}
```

### Unstructured Data

No predefined schema at all — PDFs, emails, images, call recordings, social media posts. In an insurance context, this is claim photos, scanned documents, or voice recordings. You cannot query it with plain SQL; it requires NLP, OCR, or vision models — which connects directly to your AI engineering work.

### How the three shapes differ (diagram)

```mermaid
flowchart LR
  S[Structured<br/>tables & fixed schema] --> SQL[Classic SQL]
  M[Semi-structured<br/>JSON, APIs] --> J[JSON in warehouse / ELT]
  U[Unstructured<br/>PDFs, images, audio] --> AI[NLP / OCR / vision]
```

---

## How a Data Warehouse Looks

A data warehouse uses a **three-tier architecture**, which is the most common design:

- **Bottom tier (Storage layer)** — The core database (e.g., Snowflake, Redshift, BigQuery, or even PostgreSQL). Raw or transformed data lives here, often organized into _staging_, _core_, and _data mart_ schemas
- **Middle tier (OLAP layer)** — An analytical processing engine that handles complex aggregations and queries across massive datasets without hitting your operational DB
- **Top tier (Presentation layer)** — BI tools (Power BI, Tableau, Metabase) or dashboards that business users interact with

Data flows in from **source systems** (your insurance apps, CRMs, APIs) → through **ETL/ELT pipelines** → into the warehouse layers → up to dashboards. Inside the warehouse, data is often organized in star or snowflake schemas: a central **fact table** (e.g., `claims`) surrounded by **dimension tables** (e.g., `customers`, `policies`, `dates`).

### Three-tier warehouse (diagram)

```mermaid
flowchart TB
  subgraph TOP["Presentation — BI & dashboards"]
    P1[Power BI / Tableau / Metabase]
    P2[FastAPI & AI apps]
  end
  subgraph MID["OLAP — analytical engine"]
    O[Aggregations & large scans]
  end
  subgraph BOT["Storage — warehouse DB"]
    B[Snowflake / BigQuery / PostgreSQL]
  end
  TOP --> MID --> BOT
  SRC[Source systems] --> PIPE[ETL or ELT pipelines] --> BOT
```

### Star schema (simplified)

```mermaid
flowchart LR
  FCT(["fact — claims"])
  DIM1["dim — customers"]
  DIM2["dim — policies"]
  DIM3["dim — dates"]
  DIM1 --> FCT
  DIM2 --> FCT
  DIM3 --> FCT
```

---

## Step-by-Step Data Engineering Learning Guide

This is a structured path built around your existing skills — Python, FastAPI, and PostgreSQL. We'll go from zero to a working ELT pipeline with orchestration.

---

## Stage 1 — Understand the Mental Model

Before writing any code, lock in these concepts mentally.

**Think of data flow like this:**

```mermaid
flowchart LR
  SRC["Source systems<br/>APIs, DBs, files"] --> PIPE["Pipeline<br/>ETL or ELT"]
  PIPE --> STO["Storage<br/>warehouse / lake"]
  STO --> AN["Analysis<br/>SQL, BI, ML"]
```

- In **ETL**, the pipeline itself is responsible for cleaning and shaping data. Your Python script does the heavy lifting _before_ inserting into the DB.
- In **ELT**, Python just moves data. The _warehouse_ (PostgreSQL, Snowflake, BigQuery) does the transformation via SQL, views, and dbt models.

The modern world uses **ELT** because storage is cheap and warehouse engines are powerful. ETL is legacy (but still common in insurance/enterprise).

---

## Stage 2 — Build Your First ETL Pipeline (Pure Python)

This is your hands-on starting point. You already know Python and PostgreSQL, so this will feel natural.

**Goal:** Pull insurance-like data from a CSV → clean it → load it into PostgreSQL.

```mermaid
flowchart LR
  CSV[CSV / API] --> PY[Python: pandas transform]
  PY --> PG[(PostgreSQL<br/>clean table only)]
```

### Step 2.1 — Setup

```bash
pip install pandas psycopg2-binary sqlalchemy
```

### Step 2.2 — The Extract Step

```python
import pandas as pd

# Simulate extracting raw data (could be an API, CSV, or another DB)
def extract(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath)
    print(f"Extracted {len(df)} rows")
    return df

raw_df = extract("claims.csv")
```

Your `claims.csv` might look like this (structured data):

```
claim_id, customer_name, claim_date,  amount,  status
C001,     Ahmad Al-X,    2025-01-15,  1500.00, approved
C002,     Sara M,        2025-01-17,  ,         pending   ← missing amount!
C003,     Khalid T,      bad-date,    200.00,  approved   ← bad date!
```

### Step 2.3 — The Transform Step

This is where ETL does its work _before_ loading. You clean, validate, and shape:

```python
def transform(df: pd.DataFrame) -> pd.DataFrame:
    # 1. Drop rows with missing critical fields
    df = df.dropna(subset=["amount"])

    # 2. Fix data types
    df["claim_date"] = pd.to_datetime(df["claim_date"], errors="coerce")
    df = df.dropna(subset=["claim_date"])  # drop rows with bad dates

    # 3. Normalize text
    df["status"] = df["status"].str.strip().str.lower()

    # 4. Derive new columns (business logic)
    df["is_high_value"] = df["amount"] > 1000

    return df

clean_df = transform(raw_df)
```

### Step 2.4 — The Load Step

```python
from sqlalchemy import create_engine

def load(df: pd.DataFrame, table_name: str):
    engine = create_engine("postgresql://user:password@localhost:5432/insurance_dw")
    df.to_sql(table_name, engine, if_exists="replace", index=False)
    print(f"Loaded {len(df)} rows into '{table_name}'")

load(clean_df, "claims_clean")
```

**What you just built:** A complete ETL pipeline. Data was transformed _before_ reaching the database. This is the classic pattern.

---

## Stage 3 — Rebuild it as ELT

Now flip the approach: **load raw data first, transform inside PostgreSQL**.

### Step 3.1 — Load Raw (No Transformation)

```python
def load_raw(df: pd.DataFrame):
    engine = create_engine("postgresql://user:password@localhost:5432/insurance_dw")
    # Load as-is, no cleaning — this is the "raw" layer
    df.to_sql("raw_claims", engine, if_exists="replace", index=False)

raw_df = pd.read_csv("claims.csv")
load_raw(raw_df)  # dump everything, messy data included
```

Your warehouse now has a `raw_claims` table with all the messy, unprocessed data.

### Step 3.2 — Transform Inside PostgreSQL (SQL)

Now write SQL to create a clean view or table _inside_ the warehouse:

```sql
-- This SQL lives in your warehouse, not in Python
CREATE OR REPLACE VIEW cleaned_claims AS
SELECT
    claim_id,
    TRIM(LOWER(customer_name))          AS customer_name,
    claim_date::DATE                     AS claim_date,
    amount::NUMERIC                      AS amount,
    TRIM(LOWER(status))                  AS status,
    CASE WHEN amount::NUMERIC > 1000
         THEN TRUE ELSE FALSE END        AS is_high_value
FROM raw_claims
WHERE amount IS NOT NULL
  AND claim_date ~ '^\d{4}-\d{2}-\d{2}$';  -- valid date format only
```

**Key insight:** The raw data is _always preserved_. You can re-run this SQL anytime if business rules change, without re-extracting from the source.

```mermaid
flowchart LR
  CSV2[CSV / API] --> PY2[Python: load as-is]
  PY2 --> RAWT[(raw_claims)]
  RAWT --> SQLV[SQL views / dbt]
  SQLV --> CLEANV[(cleaned layer)]
```

---

## Stage 4 — Introduce dbt (The Industry Standard for ELT)

dbt is what professionals use to manage the "T" in ELT at scale. Think of it as **version-controlled SQL with superpowers** — testing, documentation, lineage graphs, and dependency management.

### Step 4.1 — Install & Init

```bash
pip install dbt-postgres
dbt init insurance_warehouse
cd insurance_warehouse
```

### Step 4.2 — A dbt Model

In dbt, every transformation is a `.sql` file called a **model**. Create `models/cleaned_claims.sql`:

```sql
-- models/cleaned_claims.sql
-- dbt automatically wraps this in CREATE TABLE/VIEW
SELECT
    claim_id,
    TRIM(LOWER(customer_name))  AS customer_name,
    claim_date::DATE             AS claim_date,
    amount::NUMERIC              AS amount,
    status
FROM {{ ref('raw_claims') }}    -- dbt resolves dependencies automatically
WHERE amount IS NOT NULL
```

### Step 4.3 — Run & Test

```bash
dbt run       # executes all models, creates tables/views in PostgreSQL
dbt test      # runs data quality tests
dbt docs generate && dbt docs serve  # opens a browser with full lineage graph
```

dbt builds a visual graph showing how `raw_claims` → `cleaned_claims` → `claims_summary`, which is invaluable for large projects.

```mermaid
flowchart LR
  R[raw_claims] --> C[cleaned_claims]
  C --> S[claims_summary]
  C --> H[high_value_claims]
```

---

## Stage 5 — Orchestrate with Apache Airflow

Once you have pipelines, you need to **schedule and monitor** them. Airflow is the most widely used tool for this.

**Core concept — the DAG (Directed Acyclic Graph):** A DAG defines your pipeline steps and their order. Each step is a **task**.

```mermaid
flowchart LR
  T1[extract] --> T2[load_raw] --> T3[run_dbt]
```

```python
# dags/insurance_pipeline.py
from airflow.decorators import dag, task
import pendulum

@dag(
    dag_id="insurance_etl",
    schedule="0 6 * * *",  # runs every day at 6 AM
    start_date=pendulum.datetime(2025, 1, 1, tz="UTC"),
    catchup=False,
)
def insurance_pipeline():

    @task
    def extract():
        # your extract logic here
        print("Extracting from source...")

    @task
    def load_raw():
        # load to PostgreSQL raw layer
        print("Loading raw data...")

    @task
    def run_dbt():
        import subprocess
        subprocess.run(["dbt", "run", "--project-dir", "/opt/dbt/insurance_warehouse"])

    extract() >> load_raw() >> run_dbt()  # defines the order

dag = insurance_pipeline()
```

Airflow gives you a web UI where you can see which DAG runs succeeded, failed, and how long each task took — essential for production pipelines.

---

## Stage 6 — Understand the Warehouse Layers

This is how professionals organize data inside the warehouse. Each layer has a purpose:

| Layer                 | Also Called | What Lives Here                         | Who Touches It                  |
| --------------------- | ----------- | --------------------------------------- | ------------------------------- |
| **Raw / Bronze**      | Staging     | Exact copy of source data, no changes   | Engineers only                  |
| **Cleaned / Silver**  | Core        | Validated, typed, deduplicated data     | Engineers, analysts             |
| **Aggregated / Gold** | Data Marts  | Business-ready tables (KPIs, summaries) | Analysts, dashboards, AI models |

```mermaid
flowchart TB
  BRONZE[Raw / Bronze<br/>staging — as landed] --> SILVER[Cleaned / Silver<br/>typed, validated]
  SILVER --> GOLD[Aggregated / Gold<br/>marts & KPIs]
```

In PostgreSQL, you implement this with **schemas**:

```sql
CREATE SCHEMA raw;        -- bronze layer
CREATE SCHEMA core;       -- silver layer
CREATE SCHEMA analytics;  -- gold layer
```

Your dbt models then transform data _upward_ through these layers: `raw.claims` → `core.claims` → `analytics.claims_summary`.

---

## Your Learning Roadmap

Here's the exact sequence to follow, estimated by effort:

1. **Week 1** — Build the ETL pipeline (Stage 2) with a local CSV and PostgreSQL
2. **Week 2** — Rebuild as ELT (Stage 3), get comfortable with raw vs. clean layers
3. **Week 3** — Introduce dbt, convert your SQL transforms into dbt models
4. **Week 4** — Set up Airflow locally with Docker, orchestrate your full pipeline
5. **Week 5+** — Connect a real API source (e.g., a public insurance or financial dataset), add dbt tests, and build a simple dashboard with Metabase or Grafana

Since you already work in insurance with AI, a great capstone project would be: **ingesting raw policy/claims data → cleaning with dbt → feeding the gold layer into a RAG system** — connecting your data engineering knowledge directly to your AI work.

---

## dbt Explained Clearly

dbt (data build tool) is a **transformation framework** that lives entirely inside your data warehouse. It only handles the **"T" in ELT** — it does not extract or load data. You write plain SQL `SELECT` statements, and dbt handles everything else: creating tables/views, managing dependencies, testing, and documentation.

### The Core Idea

Think of dbt as **Git + SQL for data transformations**. Before dbt, data teams had transformation logic scattered in random SQL scripts, Python files, or BI tool calculations — no version control, no tests, no documentation. dbt brings **software engineering discipline** to SQL.

The mental model is simple:

```text
You write:     SELECT * FROM raw.claims WHERE amount IS NOT NULL
dbt executes:  CREATE TABLE core.cleaned_claims AS (your SELECT)
```

You only think about _what data you want_. dbt figures out _how to build and maintain it_.

### Core Concepts

#### Models

A **model** is just a `.sql` file containing a single `SELECT` statement. Each model becomes a table or view in your warehouse.

```text
my_project/
  models/
    raw/
      raw_claims.sql        ← Layer 1: raw data as-is
    core/
      cleaned_claims.sql    ← Layer 2: cleaned data
    analytics/
      claims_summary.sql    ← Layer 3: business KPIs
```

`cleaned_claims.sql` might look like this:

```sql
-- models/core/cleaned_claims.sql
SELECT
    claim_id,
    TRIM(LOWER(customer_name))  AS customer_name,
    claim_date::DATE             AS claim_date,
    amount::NUMERIC              AS amount,
    status
FROM {{ ref('raw_claims') }}    -- ← this is the magic
WHERE amount IS NOT NULL
```

The `{{ ref('raw_claims') }}` is a **Jinja template function** that tells dbt: _"this model depends on `raw_claims`"_. dbt uses this to build a dependency graph automatically.

#### The DAG (Dependency Graph)

Because every model uses `ref()` to reference other models, dbt builds a **Directed Acyclic Graph (DAG)** — a visual map of how data flows through your entire project.

```mermaid
flowchart TB
  RC[raw_claims] --> CC[cleaned_claims]
  CC --> CS[claims_summary]
  CC --> HV[high_value_claims]
  HV --> FR[fraud_risk_model]
```

When you run `dbt run`, it executes models **in the correct order**, parallelizing where it can. If `cleaned_claims` fails, anything downstream won't run. This is the same concept as Airflow DAGs but specifically for SQL transformations.

#### Materializations

Materialization controls **how dbt physically creates your model** in the database. There are four main types:

| Type          | What it creates             | When to use                        |
| ------------- | --------------------------- | ---------------------------------- |
| `view`        | A SQL view (no data stored) | Raw/staging layer, fast iteration  |
| `table`       | A full table (data stored)  | Core layer, queried often          |
| `incremental` | Appends only new rows       | Large tables, fact tables          |
| `ephemeral`   | Just a CTE, no DB object    | Helper logic, not queried directly |

You set this in a config block at the top of your model:

```sql
{{ config(materialized='incremental') }}

SELECT *
FROM {{ ref('raw_claims') }}
WHERE claim_date > (SELECT MAX(claim_date) FROM {{ this }})
```

`{{ this }}` refers to the model's own table — so incremental models only process _new rows_ since the last run, which is critical for large insurance datasets.

#### Tests

dbt has built-in **data quality tests** you define in a `.yml` file alongside your models:

```yaml
# models/core/schema.yml
models:
  - name: cleaned_claims
    columns:
      - name: claim_id
        tests:
          - unique # no duplicate IDs
          - not_null # must always exist
      - name: status
        tests:
          - accepted_values:
              values: ["approved", "pending", "rejected"]
      - name: amount
        tests:
          - not_null
```

Run with `dbt test` — it executes all tests and tells you exactly which rows fail. This replaces the manual data validation code you'd normally write in Python.

#### Sources

A **source** is how dbt references tables that were loaded _by external tools_ (your EL step — Python scripts, Fivetran, Airbyte) and not built by dbt itself:

```yaml
# models/sources.yml
sources:
  - name: raw
    database: insurance_dw
    schema: raw
    tables:
      - name: claims
      - name: policies
      - name: customers
```

Then in your model, you reference it with `{{ source('raw', 'claims') }}` instead of hardcoding the schema name. This means if you rename a schema, you change it in one place only.

#### Macros

Macros are **reusable Jinja functions** — like Python functions but for SQL. Instead of copy-pasting the same logic across 10 models, you write it once:

```sql
-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name) %}
    ({{ column_name }} / 100.0)::NUMERIC(10, 2)
{% endmacro %}
```

Then use it anywhere:

```sql
SELECT
    claim_id,
    {{ cents_to_dollars('amount') }} AS amount_usd
FROM {{ ref('raw_claims') }}
```

#### Documentation

dbt auto-generates a **web-based documentation site** from your YAML descriptions:

```bash
dbt docs generate  # builds the docs
dbt docs serve     # opens in browser at localhost:8080
```

The docs site shows every model, column description, test results, and the full DAG lineage graph — invaluable when your warehouse grows to 50+ models.

### dbt vs. Writing SQL Manually

|                         | Raw SQL Scripts                | dbt                               |
| ----------------------- | ------------------------------ | --------------------------------- |
| Dependency management   | Manual, error-prone            | Automatic via `ref()`             |
| Version control         | You have to set it up          | Built on Git natively             |
| Testing                 | You write validation code      | Declarative YAML tests            |
| Documentation           | Separate Word doc nobody reads | Auto-generated, always up to date |
| Environments (dev/prod) | Hardcoded schema names         | Managed by profiles               |
| Reusability             | Copy-paste                     | Macros + `ref()`                  |

### How It Fits Your Stack

```mermaid
flowchart TB
  PY["Python / FastAPI<br/>Extract + Load"] --> RAW["PostgreSQL raw schema"]
  RAW --> DBT["dbt SQL models<br/>Transform"]
  DBT --> CORE["core + analytics"]
  CORE --> CONS["FastAPI / RAG / dashboards"]
```

dbt sits exactly in the middle — it's the layer that turns messy raw insurance data into reliable, tested, documented tables that your AI features can trust. Because it's just SQL + Git, your existing skills transfer directly with minimal new tooling to learn.

---

## Real-World Scenario: Insurance Company & the Modern Data Stack

This section walks through the full picture with a realistic insurance-company scenario.

### The Big Picture First

Imagine you work at an insurance company. You have data scattered across:

- A **policy management system** (Oracle DB)
- A **CRM** (Salesforce) holding customer data
- A **claims system** (PostgreSQL)
- A **payments system** (Stripe / internal)
- **External data** (weather APIs, fraud score APIs)

The goal: bring all of this into one place so analysts can answer questions like _"Which region has the highest claim frequency per policy type?"_ or _"Which customers are at risk of churn?"_

Here's the high-level architecture:

```mermaid
flowchart LR
  SRC2[Sources<br/>CRM, claims, payments] --> ING[Ingestion<br/>Fivetran / Airbyte / Python]
  ING --> RAW2[Raw storage<br/>warehouse or lake]
  RAW2 --> TR[Transform<br/>dbt in warehouse]
  TR --> WH[Warehouse marts]
  WH --> OUT2[BI & AI layer]
```

Every tool in the modern stack owns **one layer**. The sections below walk through each.

### Step 1 — Extract & Load (Ingestion Layer)

This is where data is **pulled from source systems and dumped raw** into cloud storage or directly into the warehouse. This is the **EL** part of ELT.

**Real tools used:**

| Tool                              | What it does                          | Best for                             |
| --------------------------------- | ------------------------------------- | ------------------------------------ |
| **Fivetran**                      | Managed SaaS connectors, zero-code    | Salesforce, Stripe, SaaS sources     |
| **Airbyte**                       | Open-source connectors, self-hostable | Custom sources, cost-sensitive teams |
| **AWS Glue / Azure Data Factory** | Cloud-native pipelines                | Teams already on AWS/Azure           |
| **Kafka / Debezium**              | Real-time CDC (Change Data Capture)   | Streaming from PostgreSQL/Oracle     |
| **Python scripts (custom)**       | Full control, FastAPI-friendly        | Internal APIs, custom sources        |

In your insurance case, **Fivetran** might connect to Salesforce and Stripe, while **Debezium** streams CDC events from your PostgreSQL claims DB in real-time.

**Where does data land?**

In ELT (the modern approach), data lands **raw and untouched** first:

- Into **Snowflake** raw schema (e.g., `RAW.salesforce.contacts`)
- Or into **AWS S3 / Azure Blob** as JSON/Parquet files (a "data lake" staging area)

Nothing is cleaned yet. You load first, transform later.

### Step 2 — The Data Warehouse (Storage Layer)

This is the central brain. The three dominant cloud warehouses are:

| Warehouse         | Strengths                                              | Used by                                                                                            |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Snowflake**     | Separates compute from storage, great SQL, multi-cloud | Many modern data teams ([overview](https://www.eficens.ai/resources/data-engineering-dbt-airflow)) |
| **BigQuery**      | Serverless, pay-per-query, deep GCP integration        | Google Cloud shops                                                                                 |
| **Redshift**      | Tight AWS integration, mature ecosystem                | AWS-heavy orgs                                                                                     |
| **Azure Synapse** | Native Azure, good for enterprises with AD/Azure       | Teams already on Azure                                                                             |

For an insurance company on Azure, **Azure Synapse** or **Snowflake on Azure** are common fits.

**How is data physically stored?**

In Snowflake/Redshift/BigQuery, data is stored in **columnar format** — meaning each column is stored together, not each row. This makes aggregations (like `SUM(claim_amount)`) very fast. A table like `policy_id | customer_id | claim_amount | claim_date | region` stores `claim_amount` as a continuous block on disk, so `SUM(claim_amount)` reads far less data than row-by-row storage.

### Step 3 — Transformation Layer (dbt)

Once raw data is in the warehouse, **dbt** transforms it using SQL — in a git-controlled, testable, documented way.

**Typical dbt layer structure (medallion / layered architecture):**

```mermaid
flowchart TB
  R0[RAW<br/>Fivetran / Airbyte] --> ST[STAGING stg_*]
  ST --> INT[INTERMEDIATE int_*]
  INT --> MART[MARTS fct_* dim_*]
```

**In practice for insurance:**

```sql
-- models/staging/stg_claims.sql
SELECT
    claim_id,
    policy_id,
    CAST(claim_date AS DATE) AS claim_date,
    claim_amount::FLOAT AS claim_amount,
    status
FROM {{ source('raw', 'claims') }}
WHERE claim_amount > 0
```

```sql
-- models/marts/fct_claims.sql
SELECT
    c.claim_id,
    c.claim_amount,
    p.policy_type,
    cu.region,
    cu.customer_segment
FROM {{ ref('stg_claims') }} c
LEFT JOIN {{ ref('stg_policies') }} p ON c.policy_id = p.policy_id
LEFT JOIN {{ ref('stg_customers') }} cu ON p.customer_id = cu.customer_id
```

dbt runs these SQL files **inside Snowflake** — it never moves data out. This is ELT: transform **inside the warehouse** using its own compute.

### Step 4 — Orchestration (Apache Airflow)

You need something to **schedule and coordinate** all of this — run ingestion at 2 AM, then trigger dbt after it completes, then notify Slack if something fails. That's **Apache Airflow**.

Airflow uses **DAGs** written in Python. Example shape (operators vary by install):

```python
# dags/insurance_pipeline.py
from airflow import DAG
from airflow.providers.airbyte.operators.airbyte import AirbyteTriggerSyncOperator
# from cosmos import DbtTaskGroup  # Astronomer Cosmos: runs dbt inside Airflow (optional add-on)

with DAG("insurance_daily_pipeline", schedule="0 2 * * *") as dag:

    sync_claims = AirbyteTriggerSyncOperator(
        task_id="sync_claims",
        connection_id="claims-postgres-connection",
    )

    # dbt_transform = DbtTaskGroup(...)  # wire to your dbt project path

    sync_claims  # >> dbt_transform when Cosmos is configured
```

This DAG could run every night at 2 AM, pull fresh claims data, then run dbt transforms.

### Step 5 — BI & AI Consumption Layer

Once data sits in clean `fct_` and `dim_` tables in Snowflake, it flows into:

- **Power BI / Tableau / Looker** — dashboards for business analysts
- **Python notebooks (Jupyter/Databricks)** — data science, ML models
- **Your FastAPI AI apps** — query Snowflake via `snowflake-connector-python` or SQLAlchemy to power AI features

### ETL vs ELT: How Data is Saved Differently

```mermaid
flowchart TB
  subgraph etl["ETL"]
    ETL1[Transform outside warehouse] --> ETL2[Only clean data stored]
  end
  subgraph elt["ELT"]
    ELT1[Load raw to warehouse] --> ELT2[Transform with SQL/dbt]
    ELT2 --> ELT3[Raw + marts coexist]
  end
```

|                         | ETL (Traditional)                                    | ELT (Modern)                                          |
| ----------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| Where transform happens | **Outside** the warehouse (in the ETL tool's server) | **Inside** the warehouse (Snowflake/BigQuery compute) |
| Raw data saved?         | No — only clean data lands                           | Yes — raw data always preserved                       |
| Tools                   | Informatica, SSIS, Talend                            | Fivetran + dbt + Snowflake                            |
| Re-processing           | Must re-extract from source                          | Just re-run dbt on existing raw data                  |
| Cost model              | ETL server compute (fixed)                           | Warehouse compute (elastic, pay-per-use)              |

In ETL, if transformation logic had a bug, you may have lost raw data and must re-pull from the source. In ELT, raw data stays in the warehouse — fix the dbt model and re-run.

### The Full Developer Toolkit

| Category        | Tool                                                                                    | Language / Interface |
| --------------- | --------------------------------------------------------------------------------------- | -------------------- |
| Ingestion       | Fivetran, Airbyte                                                                       | UI + API             |
| Warehouse       | Snowflake, BigQuery, Synapse                                                            | SQL                  |
| Transformation  | **dbt**                                                                                 | SQL + Jinja          |
| Orchestration   | **Apache Airflow**                                                                      | Python               |
| Streaming       | Kafka, Debezium                                                                         | Config + Python      |
| Version control | Git + GitHub                                                                            | CLI                  |
| CI/CD           | GitHub Actions                                                                          | YAML                 |
| Monitoring      | **Elementary** (dbt), Grafana                                                           | SQL + UI             |
| BI              | Power BI, Looker, Metabase                                                              | UI                   |
| Python packages | `dbt-snowflake`, `apache-airflow`, `snowflake-connector-python`, `pandas`, `sqlalchemy` | Python               |

### Putting It All Together

For your insurance company, the full daily flow might look like this:

```mermaid
flowchart LR
  A["02:00 sync sources"] --> B["02:30 raw in SNOWFLAKE.RAW"]
  B --> C["02:35 dbt run"]
  C --> D["03:00 marts ready"]
  D --> E["Morning: BI refresh"]
  D --> F["Apps: risk API"]
```

1. **2:00 AM** — Airflow triggers Airbyte/Fivetran to sync from Oracle (policies), PostgreSQL (claims), Salesforce (customers), Stripe (payments)
2. **2:30 AM** — Raw tables land in `SNOWFLAKE.RAW.*` — untouched JSON/columnar data
3. **2:35 AM** — Airflow triggers dbt: staging → intermediate → marts
4. **3:00 AM** — Clean `fct_claims`, `dim_customers`, `dim_policies` tables are ready
5. **Morning** — Analysts open Power BI; dashboards refresh with overnight data
6. **Real-time** — Your FastAPI app queries Snowflake for claim risk scoring via `snowflake-connector-python` and serves it to the insurance portal

This stack — **Airbyte + Snowflake + dbt + Airflow** — is often called the **Modern Data Stack**, and it's a common architecture at data-driven companies today.

---

## Diagrams in these coding notes

Fenced blocks with language **`mermaid`** render as diagrams in the article view (built with [Mermaid](https://mermaid.js.org/)). Use them anywhere you want a quick architecture or flow sketch alongside tables and code.

### Air-gapped environment (no direct internet)

For secure ML or regulated workloads, **air-gapped** means the training or serving cluster cannot reach public APIs, PyPI, or model hubs directly — artifacts move through **internal registries** and controlled paths instead.

```mermaid
flowchart TB
  EXT["Internet / external<br/>cloud APIs, package & model registries"]
  EXT -.->|No routable path| AIR["Air-gapped zone<br/>GPU server ↔ internal registry ↔ applications"]
```
