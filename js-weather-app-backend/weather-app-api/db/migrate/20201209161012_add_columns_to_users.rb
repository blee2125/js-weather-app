class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :locations, :string
    add_column :users, :settings, :string
  end
end
