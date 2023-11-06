require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "Task" do
    #described_class.create({id: -1,description: "sample task", story_point: 2 ,status:0,user:User.first })
    let(:user) { User.find_by_email("pm1@gmail.com") }
    let(:token) { login({password: "qwer1234", email: user.email}) }
    let(:sample_task) {{ description: "sample task", story_point: 2 ,status:0,user_id:-1 }}

    context "waiting params with user information header" do
      it "If there is no authorization header it should return 401" do
        post "initialize_or_update", :params => { description: "sample task", story_point: 2 ,status:0,user_id:-1 }

        expect(response.code).to eq('401') #unauthorized
      end
      it "If there is authorization header it should return 200 and task fields" do
        request.headers["Authorization"] = token
        post "initialize_or_update", :params => sample_task

        expect(response.code).to eq("200") #ok
      end
    end
    context "should create with correctly user choose, if the auto user selected" do
      it "uses email validation" do
        request.headers["Authorization"] = token
        post "initialize_or_update", :params => sample_task
        task1 = JSON.parse response.body
        expect(response.code).to eq("200") #ok


        post "initialize_or_update", :params => sample_task
        task2 = JSON.parse  response.body
        expect(response.code).to eq("200") #ok

        expect(task1["task"]["user_id"]).not_to eq(task2["task"]["user_id"])
      end
    end
  end
end
