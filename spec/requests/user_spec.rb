require 'rails_helper'

RSpec.describe User, type: :model do
  describe "GET /index" do


    context "User model" do
      it "uses email validation" do
        expect {
          user = described_class.new({ username: "abcdefg", email: "developer1@gmail.com", password: "qwer1234", role: 0, story_point_capability: 2 })
          user.save!
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
      it "uses username validation" do
        expect {
          user = described_class.new({ username: "developer 1", email: "abcdefg@gmail.com", password: "qwer1234", role: 0, story_point_capability: 2 })
          user.save!
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
      it "uses password validation" do
        expect {
          user = described_class.new({ username: "abcdefg", email: "abcdefg@gmail.com", password: "", role: 0, story_point_capability: 2 })
          user.save!
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
      it "if everything available for validates" do
        expect {
          user = described_class.new({ username: "abcdefg", email: "abcdefg@gmail.com", password: "qwer1234", role: 0, story_point_capability: 2 })
          user.save!
        }.not_to raise_error
      end
    end
  end
end
