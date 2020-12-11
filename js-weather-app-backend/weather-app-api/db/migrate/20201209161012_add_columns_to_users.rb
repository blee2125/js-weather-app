class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :locations, :text, array: true, default: []
    add_column :users, :settings, :text, array: true, default: []
  end
end
