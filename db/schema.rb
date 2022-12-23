# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_22_170943) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", precision: nil, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.text "edit_history", default: ""
    t.integer "commentable_id"
    t.string "commentable_type"
    t.bigint "user_id", null: false
    t.boolean "reply", default: false
    t.integer "comment_number"
    t.text "body"
    t.string "date"
    t.string "author_nick"
    t.string "author_avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "original_comment_author"
    t.string "parent_id"
    t.string "ancestry"
    t.integer "total_upvotes", default: 0
    t.integer "total_downvotes", default: 0
    t.index ["ancestry"], name: "index_comments_on_ancestry"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "communications", force: :cascade do |t|
    t.string "date"
    t.string "com_type"
    t.string "recipient"
    t.string "status"
    t.bigint "user_id"
    t.string "postgrid_id"
    t.json "paypal_full_object", default: {}
    t.json "postgrid_full_object", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "formatted_date"
    t.string "mailgun_id"
    t.string "mailgun_recipient_email"
    t.index ["user_id"], name: "index_communications_on_user_id"
  end

  create_table "dislikes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "comment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_dislikes_on_comment_id"
    t.index ["user_id"], name: "index_dislikes_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "comment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_likes_on_comment_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "newsletters", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stories", force: :cascade do |t|
    t.string "title"
    t.string "keywords"
    t.text "body"
    t.string "url"
    t.string "date"
    t.string "topic"
    t.string "slug"
    t.string "author_nick"
    t.string "author_avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "caption"
    t.text "urls", default: [], array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "full_name"
    t.string "password_digest"
    t.string "confirm_token"
    t.boolean "isAdmin"
    t.string "email_confirmed"
    t.boolean "opt_in"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_url"
    t.string "nick"
    t.string "auth_token"
    t.integer "number_of_comments", default: 0
    t.boolean "userCreatedAutomatically", default: false
    t.string "first_name"
    t.string "last_name"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "users"
  add_foreign_key "communications", "users"
  add_foreign_key "dislikes", "comments"
  add_foreign_key "dislikes", "users"
  add_foreign_key "likes", "comments"
  add_foreign_key "likes", "users"
end
